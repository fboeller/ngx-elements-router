import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementsRouterModule } from '../../../../ngx-elements-router/src/lib/elements-router.module';
import { MicroFrontendHostComponent } from './micro-frontend-host.component';

const routes: Routes = [
  {
    path: '**',
    component: MicroFrontendHostComponent,
  },
];

@NgModule({
  declarations: [MicroFrontendHostComponent],
  imports: [RouterModule.forChild(routes), ElementsRouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicroFrontendHostModule {}
