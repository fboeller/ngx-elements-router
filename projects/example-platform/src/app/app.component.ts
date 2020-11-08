import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>I'm in the platform</h1>
    <a routerLink="/micro-frontend/child">Go to child page</a>
    <a routerLink="/micro-frontend">Go to micro frontend main page</a>
    <a routerLink="/platform-page">Go to platform page</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
