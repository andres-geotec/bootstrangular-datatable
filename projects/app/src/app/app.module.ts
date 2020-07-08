import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DatatableModule } from 'bootstrangular-datatable';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
