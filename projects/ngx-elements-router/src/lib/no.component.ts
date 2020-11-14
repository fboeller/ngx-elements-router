import { Component } from '@angular/core';

/**
 * This component can be used for routes '/root/**' that shall never be resolved by the web component itself.
 * Instead, the host embedding the web component can resolve these routes.
 */
@Component({
  selector: 'aer-no-component',
  template: '',
})
export class NoComponent {}
