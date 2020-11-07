import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { EntryComponent } from './entry.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [EntryComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('aer-entry', customElement);
    console.log(`Defined the custom element 'aer-entry'`);
  }
}
