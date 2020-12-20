import { Component } from '@angular/core';

@Component({
  selector: 'mf-micro-frontend',
  template: `
    <h2>The micro frontend</h2>
    <a routerLink="/">Go to platform main page</a>
    <a routerLink="/child">Go to platform child page</a>
    <a routerLink="./">Go to micro frontend main page</a>
    <a routerLink="./child">Go to micro frontend child page</a>
    <router-outlet></router-outlet>
  `,
})
export class MicroFrontendComponent {}
