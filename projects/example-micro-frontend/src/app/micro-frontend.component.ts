import { Component } from '@angular/core';

@Component({
  selector: 'mf-micro-frontend',
  template: `
    <h2>The micro frontend</h2>
    <a routerLink="/">/</a>
    <a routerLink="/child">/child</a>
    <a routerLink="./">/micro-frontend</a>
    <a routerLink="./child">/micro-frontend/child</a>
    <a routerLink="./redirect">/micro-frontend/redirect</a>
    <router-outlet></router-outlet>
  `,
})
export class MicroFrontendComponent {}
