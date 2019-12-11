import { NgModule } from '@angular/core';
import {PolarPlotComponent} from '../../../bd2-ngx-polarplot-demo/src/app/polar-plot/polar-plot.component';
import {CommonModule} from '@angular/common';




@NgModule({
  declarations: [PolarPlotComponent],
  imports: [
    // CommonModule
  ],
  exports: [PolarPlotComponent]
})
export class BD2NgxPolarplotModule { }
