import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularElementsRouterModule } from '../../../../angular-elements-router/src/lib/angular-elements-router.module';
import { MicroFrontendHostComponent } from './micro-frontend-host.component';

const routes: Routes = [
  {
    path: '**',
    component: MicroFrontendHostComponent,
  },
];

@NgModule({
  declarations: [MicroFrontendHostComponent],
  imports: [RouterModule.forChild(routes), AngularElementsRouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicroFrontendHostModule {}
