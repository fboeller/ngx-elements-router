import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { EntryRoutingService } from '../../../ngx-elements-router/src/lib/entry-routing.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mf-angular-entry',
  template: `<router-outlet></router-outlet>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  private route$ = new Subject<string | undefined>();
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<string>();

  private readonly subscription: Subscription;

  constructor(private entryRoutingService: EntryRoutingService) {
    this.subscription = this.entryRoutingService.registerRouting(
      this.routeChange,
      this.route$
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.route$.next(this.route);
  }
}
