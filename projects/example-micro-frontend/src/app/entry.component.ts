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
  templateUrl: './entry.component.html',
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
