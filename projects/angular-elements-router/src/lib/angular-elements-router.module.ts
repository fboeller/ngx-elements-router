import { NgModule } from '@angular/core';
import { NoComponent } from './no.component';
import { RoutingDirective } from './routing.directive';

@NgModule({
  declarations: [RoutingDirective, NoComponent],
  imports: [],
  exports: [RoutingDirective, NoComponent],
})
export class AngularElementsRouterModule {}
