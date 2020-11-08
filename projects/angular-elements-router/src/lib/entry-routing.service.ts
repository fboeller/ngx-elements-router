import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

/**
 * Registers the routing feature on the entry component of a micro frontend.
 *
 * ```
 * export class ExampleComponent {
 *   @Input() route?: string;
 *   @Observe('route') route$: Observable<string | undefined>;
 *   @Output() routeChange = new EventEmitter<string>();
 *   private destroyed$ = new Subject<void>();
 *   constructor(private entryRoutingService: EntryRoutingService) {
 *     this.entryRoutingService.registerRouting((url) => this.routeChange.emit(url), this.route$, this.destroyed$);
 *   }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class EntryRoutingService {
  constructor(private router: Router) {}

  registerRouting(
    outgoingRoute$: Subject<string>,
    incomingRoute$: Observable<string | undefined>,
    destroyed$: Observable<void>
  ): void {
    this.registerIncomingRouting(incomingRoute$, destroyed$);
    this.registerOutgoingRouting(outgoingRoute$, destroyed$);
  }

  registerIncomingRouting(
    incomingRoute$: Observable<string | undefined>,
    destroyed$: Observable<void>
  ): void {
    incomingRoute$
      .pipe(distinctUntilChanged(), takeUntil(destroyed$))
      .subscribe((route) => {
        if (route) {
          this.router.navigateByUrl(route, { skipLocationChange: true });
        }
      });
  }

  registerOutgoingRouting(
    outgoingRoute$: Subject<string>,
    destroyed$: Observable<void>
  ): void {
    this.router.events.pipe(takeUntil(destroyed$)).subscribe((event) => {
      if (
        event instanceof NavigationStart &&
        !this.router.getCurrentNavigation()?.extras.skipLocationChange
      ) {
        outgoingRoute$.next(event.url);
      }
    });
  }
}
