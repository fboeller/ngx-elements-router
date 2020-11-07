import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoopLocationStrategy } from '../../../angular-elements-router/src/lib/noop-location-strategy';
import { ChildPageComponent } from './child-page.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
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
