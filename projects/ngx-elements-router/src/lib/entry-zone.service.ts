import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Registers the zone feature on the entry component of a micro frontend.
 * It is intended to be used with the ZoneDirective on the custom element.
 * Together, they ensure that the change detection cycles of the Angular application of a micro frontend are executed.
 * This happens, whenever the `window.Zone` object indicates the necessity of a change detection cycle.
 *
 * ```
 * export class ExampleComponent implements OnChanges, OnDestroy {
 *   @Input() microtaskEmpty$?: Observable<void>;
 *   microtaskEmpty$$ = new Subject<Observable<void>>();
 *   constructor(private entryZoneService: EntryZoneService) {
 *     this.subscription = this.entryZoneService.registerZone(this.microtaskEmpty$$);
 *   }
 *   ngOnDestroy() {
 *     this.subscription.unsubscribe();
 *   }
 *   ngOnChanges() {
 *     this.microtaskEmpty$$.next(this.microtaskEmpty$);
 *   }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class EntryZoneService {
  constructor(private zone: NgZone, private applicationRef: ApplicationRef) {}

  registerZone(
    microtaskEmpty$$: Observable<Observable<void> | undefined>
  ): Subscription {
    return microtaskEmpty$$
      .pipe(switchMap((microtaskEmpty$) => microtaskEmpty$ ?? EMPTY))
      .subscribe(() => {
        this.zone.run(() => {
          this.applicationRef.tick();
        });
      });
  }
}
