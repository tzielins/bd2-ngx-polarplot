import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
// import {BD2NgxPolarplotModule} from 'bd2-ngx-polarplot';
import {PolarPlotComponent} from './polar-plot/polar-plot.component';

@NgModule({
  declarations: [
    AppComponent, PolarPlotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // BD2NgxPolarplotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
