import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>I'm in the platform</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
