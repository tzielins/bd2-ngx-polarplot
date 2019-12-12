import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {BD2NgxPolarplotModule} from 'bd2-ngx-polarplot';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BD2NgxPolarplotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
