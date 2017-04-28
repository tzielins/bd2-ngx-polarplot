import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PolarPlotComponent} from './polar-plot/polar-plot.component';
import {D3Service} from 'd3-ng2-service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PolarPlotComponent],
  exports: [PolarPlotComponent],
  providers: [D3Service]
})
export class PolarPlotModule {
}

