import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoopLocationStrategy } from '../../../ngx-elements-router/src/lib/noop-location-strategy';
import { NoComponent } from '../../../ngx-elements-router/src/lib/no.component';
import { ChildPageComponent } from './child-page.component';
import { MainPageComponent } from './main-page.component';
import { MicroFrontendComponent } from './micro-frontend.component';

const routes: Routes = [
  {
    path: 'micro-frontend',
    component: MicroFrontendComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainPageComponent,
      },
      {
        path: 'child',
        component: ChildPageComponent,
      },
    ],
  },
  { path: '**', component: NoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
