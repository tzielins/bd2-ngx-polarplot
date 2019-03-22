import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolarPlotComponent } from './polar-plot/polar-plot.component';

@NgModule({
  declarations: [PolarPlotComponent],
  imports: [
    CommonModule
  ],
  exports: [PolarPlotComponent]
})
export class PolarPlotModule { }
