import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PolarPlotComponent} from './polar-plot/polar-plot.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PolarPlotComponent],
  exports: [PolarPlotComponent],
  providers: []
})
export class PolarPlotModule {
}
