import { NgModule } from '@angular/core';
import { NoComponent } from './no.component';
import { RoutingDirective } from './routing.directive';
import { ZoneDirective } from './zone.directive';

@NgModule({
  declarations: [ZoneDirective, RoutingDirective, NoComponent],
  imports: [],
  exports: [ZoneDirective, RoutingDirective, NoComponent],
})
export class ElementsRouterModule {}
