import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadBundleGuard } from '../../../ngx-elements-router/src/lib/load-bundle.guard';
import { PlatformMainPageComponent } from './platform-main-page.component';
import { PlatformChildPageComponent } from './platform-child-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlatformMainPageComponent,
  },
  {
    path: 'child',
    component: PlatformChildPageComponent,
  },
  {
    path: 'micro-frontend',
    canActivate: [LoadBundleGuard],
    data: {
      bundleUrl: 'http://localhost:4201/main-es2015.js',
    },
    loadChildren: () =>
      import('./micro-frontend-host/micro-frontend-host.module').then(
        (m) => m.MicroFrontendHostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
