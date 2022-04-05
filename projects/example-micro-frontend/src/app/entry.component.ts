import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { RouterEvent } from '../../../ngx-elements-router/src/lib/router-event.type';
import { EntryRoutingService } from '../../../ngx-elements-router/src/lib/entry-routing.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { EntryZoneService } from 'projects/ngx-elements-router/src/lib/entry-zone.service';

@Component({
  selector: 'mf-angular-entry',
  template: `<router-outlet></router-outlet>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<RouterEvent>();

  @Input() microtaskEmpty$?: Observable<void>;
  microtaskEmpty$$ = new Subject<Observable<void>>();

  private route$ = new Subject<string | undefined>();

  private readonly subscription: Subscription;

  constructor(
    private entryRoutingService: EntryRoutingService,
    private entryZoneService: EntryZoneService
  ) {
    const routingSubscription = this.entryRoutingService.registerRouting(
      this.routeChange,
      this.route$
    );
    const zoneSubscription = this.entryZoneService.registerZone(
      this.microtaskEmpty$$
    );
    this.subscription = routingSubscription.add(zoneSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.route$.next(this.route);
    this.microtaskEmpty$$.next(this.microtaskEmpty$);
  }
}
