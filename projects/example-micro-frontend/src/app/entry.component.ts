import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { EntryRoutingService } from '../../../angular-elements-router/src/lib/entry-routing.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'mf-angular-entry',
  template: `
    <h2>The micro frontend</h2>
    <a routerLink="/root">Go to platform main page</a>
    <a routerLink="/root/child">Go to platform child page</a>
    <a routerLink="/">Go to micro frontend main page</a>
    <a routerLink="/child">Go to micro frontend child page</a>
    <router-outlet></router-outlet>
  `,
})
export class EntryComponent implements OnChanges, OnDestroy {
  private route$ = new Subject<string | undefined>();
  @Input() route?: string;
  @Output() routeChange = new EventEmitter<string>();

  private destroyed$ = new Subject<void>();

  constructor(private entryRoutingService: EntryRoutingService) {
    this.entryRoutingService.registerRouting(
      this.routeChange,
      this.route$,
      this.destroyed$
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnChanges() {
    this.route$.next(this.route);
  }
}
