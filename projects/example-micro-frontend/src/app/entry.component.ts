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
  template: `
    <h2>The micro frontend</h2>
    <a routerLink="/">Go to platform main page</a>
    <a routerLink="/child">Go to platform child page</a>
    <a routerLink="/micro-frontend/">Go to micro frontend main page</a>
    <a routerLink="/micro-frontend/child">Go to micro frontend child page</a>
    <router-outlet></router-outlet>
  `,
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
