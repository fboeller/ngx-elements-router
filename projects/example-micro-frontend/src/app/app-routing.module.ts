import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoopLocationStrategy } from '../../../ngx-elements-router/src/lib/noop-location-strategy';
import { NoComponent } from '../../../ngx-elements-router/src/lib/no.component';
import { ChildPageComponent } from './child-page.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  { path: 'root', children: [{ path: '**', component: NoComponent }] },
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: 'child',
    component: ChildPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
