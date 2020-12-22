import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>The platform</h1>
    <a routerLink="/">/</a>
    <a routerLink="/child">/child</a>
    <a routerLink="/micro-frontend">/micro-frontend</a>
    <a routerLink="/micro-frontend/child">/micro-frontend/child</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
