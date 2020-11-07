import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { EntryRoutingService } from 'angular-elements-router';
import { Subject } from 'rxjs';

@Component({
  selector: 'aer-angular-entry',
  templateUrl: './entry.component.html',
})
export class EntryComponent implements OnDestroy {
  private route$ = new Subject<string | undefined>();
  @Input() set route(route: string | undefined) {
    this.route$.next(route);
  }
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
}
