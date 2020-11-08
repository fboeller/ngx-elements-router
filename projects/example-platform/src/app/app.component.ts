import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>The platform</h1>
    <a routerLink="/">Go to platform main page</a>
    <a routerLink="/child">Go to platform child page</a>
    <a routerLink="/micro-frontend">Go to micro frontend main page</a>
    <a routerLink="/micro-frontend/child">Go to micro frontend child page</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
