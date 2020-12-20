import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * Registers the routing feature on the entry component of a micro frontend.
 *
 * ```
 * export class ExampleComponent implements OnChanges, OnDestroy {
 *   @Input() route?: string;
 *   @Output() routeChange = new EventEmitter<string>();
 *   route$ = new Subject<string | undefined>;
 *   private destroyed$ = new Subject<void>();
 *   constructor(private entryRoutingService: EntryRoutingService) {
 *     this.entryRoutingService.registerRouting(this.routeChange, this.route$, this.destroyed$);
 *   }
 *   ngOnDestroy() {
 *     this.destroyed$.next();
 *   }
 *   ngOnChanges() {
 *     this.route$.next(this.route);
 *   }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class EntryRoutingService {
  constructor(private router: Router) {}

  registerRouting(
    outgoingRoute$: Subject<string>,
    incomingRoute$: Observable<string | undefined>
  ): Subscription {
    const inSubscription = this.registerIncomingRouting(incomingRoute$);
    const outSubscription = this.registerOutgoingRouting(outgoingRoute$);
    return inSubscription.add(outSubscription);
  }

  registerIncomingRouting(
    incomingRoute$: Observable<string | undefined>
  ): Subscription {
    return incomingRoute$.pipe(distinctUntilChanged()).subscribe((route) => {
      if (route) {
        this.router.navigateByUrl(route, { skipLocationChange: true });
      }
    });
  }

  registerOutgoingRouting(outgoingRoute$: Subject<string>): Subscription {
    return this.router.events.subscribe((event) => {
      if (
        event instanceof RoutesRecognized &&
        (!this.router.getCurrentNavigation()?.extras.skipLocationChange ||
          event.url !== event.urlAfterRedirects)
      ) {
        outgoingRoute$.next(event.urlAfterRedirects);
      }
    });
  }
}
