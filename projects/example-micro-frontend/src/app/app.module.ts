import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { EntryComponent } from './entry.component';
import { createCustomElement } from '@angular/elements';
import { ChildPageComponent } from './child-page.component';
import { MainPageComponent } from './main-page.component';
import { MicroFrontendComponent } from './micro-frontend.component';

@NgModule({
  declarations: [
    EntryComponent,
    ChildPageComponent,
    MainPageComponent,
    MicroFrontendComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const customElement = createCustomElement(EntryComponent, {
      injector: this.injector,
    });
    window.customElements.define('mf-entry', customElement);
    console.log(`Defined the custom element 'mf-entry'`);
  }
}
