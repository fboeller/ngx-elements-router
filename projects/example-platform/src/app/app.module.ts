import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformMainPageComponent } from './platform-main-page.component';
import { PlatformChildPageComponent } from './platform-child-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatformMainPageComponent,
    PlatformChildPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
