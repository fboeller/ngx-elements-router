import { Component } from '@angular/core';

/**
 * This component is referenced for web component root routes that shall never be resolved by the web component itself, but by the host embedding the web component.
 */
@Component({
  selector: 'lx-no-component',
  template: ''
})
export class NoComponent {}
