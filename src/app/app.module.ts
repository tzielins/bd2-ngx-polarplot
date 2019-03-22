import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {PolarPlotModule} from 'bd2-ngx-polarplot';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PolarPlotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
