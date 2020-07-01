import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatatableDevComponent } from './datatable/datatable.component';

//import { DatatableModule } from './../../projects/datatable/src/public-api';
import { DatatableModule } from 'datatable';

@NgModule({
  declarations: [
    AppComponent,
    DatatableDevComponent
  ],
  imports: [
    BrowserModule,
    DatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
