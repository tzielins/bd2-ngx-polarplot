import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from "@angular/core";
import {D3, D3Service, Selection} from "d3-ng2-service";
import {PolarDomainUtil} from "../polar-domain-util";
import {SmartRounder} from "../smart-rounding";
import {PetalNode} from "../polar-plot.dom";
import {BD2ColorPalette} from "../color-palette";



/**

 https://gist.github.com/nbremer/21746a9668ffdf6d8242
 https://bl.ocks.org/mbostock/4583749

 https://github.com/tomwanzek/d3-ng2-service
 https://tomwanzek.github.io/d3-ng2-demo/
 https://github.com/tomwanzek/d3-ng2-demo/blob/master/src/app/d3-demos/brush-zoom-2/brush-zoom-2.component.ts

 https://github.com/d3/d3/blob/master/CHANGES.md#shapes-d3-shape

 */

export type ShowIndividualsOptions = "none" | "all" | "selected";

@Component({
  selector: 'bd2-ngx-polar-plot',
  template: `
    <div class="polarplot"></div>
  `,
  styles: [
    `
      :host /deep/ .axis .legend  {
        font-size: 10px;
      }

      :host /deep/ .tooltip  {
        font-size: 11px;
      }

    `
  ]
})
export class PolarPlotComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {


  @Input()
  data: number[][];


  @Input()
  errors: number[];

  @Input()
  scaleRadius = true;

  @Input()
  scaleWidth = false;

  @Input()
  showIndividuals: ShowIndividualsOptions = "selected";

  @Input()
  set domain(domain: [number, number]) {
    this._domain = [domain[0], domain[1], domain[1] - domain[0]];
  };

  @Output()
  colorsPallete = new EventEmitter<string[]>()

  private d3: D3;
  private parentNativeElement: any;
  private polarUtil: PolarDomainUtil;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  private mainPane: Selection<SVGGElement, any, null, undefined>;
  private axisGrid: Selection<SVGGElement, any, null, undefined>;
  private petalsWrapper: Selection<SVGGElement, any, null, undefined>;
  private dotsWrapper: Selection<SVGGElement, any, null, undefined>;
  private individualDotsInsetWrapper: Selection<SVGGElement, any, null, undefined>;
  private tooltip: Selection<SVGGElement, any, null, undefined>;

  private radius: number;
  private _domain: number[];
  private showAllIndividuals = false;
  private showSelectedIndividuals = false;

  private dataPallete: string[];
  private individualPolarData: number[][][];

  private lookAndFeel = {
    baseTransitionsTime: 400,

    gridColor: "#CDCDCD",
    axisColor: "white",
    axisWidth: "2px",

    //done by css
    //axisFontSize: "10px",
    //tooltipFontSize: "11px",

    dotsCircleRadius: 4,
    dotsCircleStrokeWidth: '1px',
    dotsCircleFillOpacity: 0.5,

    petalAreaOpacity: 0.35,
    petalAreaOpacityActive: 0.7,
    petalLineWidth: 3 + "px",
    petalCircleRadius: 2,
    petalCircleOpacity: 0.8,

  };


  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef, element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.polarUtil = new PolarDomainUtil();

  }


  /**
   * It is detached from angular to prevent unnecessary change detection
   */
  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

  /**
   * Explicit triggers re-drawing as need to have all the parameters set (so will not redrawn if data came frist and domain later)
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {

    if (!this.data || !this._domain) {
      return;
    }

    console.log("Changes", changes);

    this.showSelectedIndividuals = (this.showIndividuals === "selected");

    this.showAllIndividuals = (this.showIndividuals === "all");

    this.updatePlot();

  }


  ngOnInit() {

    if (this.parentNativeElement !== null) {

    } else {
      console.error('Missing parrent element for the component');
    }
  }

  ngOnDestroy() {
    if (this.d3Svg && this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }


  initializeSvg() {

    let pWidth = 500;
    let pHeight = 500;

    let d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3Svg = d3ParentElement.select('.polarplot').append<SVGSVGElement>('svg');


    this.d3Svg.attr('width', '100%')
      .attr('viewBox', '0 0 ' + pWidth + ' ' + pHeight);

    this.mainPane = this.d3Svg.append<SVGGElement>('g')
      .attr('transform', 'translate(' + (pWidth / 2) + ',' + (pHeight / 2) + ')'); //moves 0,0 of the pain to the middle of the graphics

    this.radius = Math.min(pWidth, pHeight) / 2 - 25;

  }

  plotTooltip(pane: Selection<SVGGElement, any, null, undefined>, radius: number): Selection<SVGGElement, any, null, undefined> {

    if (!this.tooltip) {
      //Set up the small tooltip for when you hover over a circle
      this.tooltip = <any>pane.append("text")
        .attr("class", "tooltip")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        //.style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
        .style("opacity", 0);


    }
    return this.tooltip;
  }

  showTooltip(p: PetalNode, radius: number) {

    this.tooltip
      .attr('x', (radius + 15) * p.polarCoordinates[0])
      .attr('y', (radius + 15) * p.polarCoordinates[1])
      .text(p.roundedPeak)
      .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
      .style('opacity', 1);
  }

  hideTooltip() {
    this.tooltip
      .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
      .style("opacity", 0);
  }


  updatePlot() {

    if (!this.d3Svg) {
      this.initializeSvg();

      this.plotAxisGrid(this.mainPane, this.radius);
    }


    //the grid is plotted only once, only the lables are updated
    this.updateAxisLabels(this._domain, this.axisGrid);

    this.dataPallete = BD2ColorPalette.pallete(this.data.length);
    this.colorsPallete.next(this.dataPallete);

    this.plotDataPetals(this.data, this._domain, this.errors, this.scaleRadius, this.scaleWidth, this.dataPallete, this.mainPane, this.radius);

    this.plotAllDataDots(this.data, this._domain, this.showAllIndividuals, this.dataPallete, this.mainPane, this.radius);

    this.plotIndividualDataInset(this.data, this._domain, this.showSelectedIndividuals, this.mainPane, this.radius);

    this.plotTooltip(this.mainPane, this.radius);

  }


  plotDataPetals(dataGroups: number[][], domain: number[],
                 errors: number[], scaleRadius: boolean, scaleWidth: boolean,
                 pallete: string[],
                 mainPane: Selection<SVGGElement, any, null, undefined>, radius: number) {

    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    let d3 = this.d3;

    if (!this.petalsWrapper) {
      this.petalsWrapper = mainPane.append<SVGGElement>("g").attr("class", "petalsWrapper");
    }

    let petalsWrapper = this.petalsWrapper;
    let petalNodes = this.polarUtil.dataToPetals(dataGroups, domain, scaleRadius, scaleWidth, errors);

    let colorsFun = (d,i) => pallete[i];
    //let colorsFun = BD2ColorPalette.dataPalette(petalNodes.length);

    let petalLine = (p: PetalNode) => {

      return d3.radialLine()
        .radius(function (d) {
          return radius * d[0];
        })
        .angle(function (d) {
          return d[1];
        })
        .curve(d3.curveCardinalClosed)(<any>p.petalPath);
    };

    let instance = this;

    //so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {


      let petals = petalsWrapper.selectAll(".petal")
        .data(petalNodes);

      petals
        .select(".petalsArea")
        .transition().duration(transitionsTime)
        .attr("d", <any>petalLine);

      petals
        .select(".petalsLine")
        .transition().duration(transitionsTime)
        .attr("d", <any>petalLine);

      petals
        .select(".petalsCircle")
        .transition().duration(transitionsTime)
        .attr("cx", function (d: PetalNode, i) {
          return radius * d.polarCoordinates[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("cy", function (d: PetalNode, i) {
          return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        });

      let newPetals = petals
        .enter()
        .append<SVGGElement>("g")
        .attr("class", "petal");


      newPetals
        .append("path")
        .attr("class", "petalsArea")
        .attr("d", <any>petalLine)
        .style("fill", colorsFun)
        .style("fill-opacity", 0)
        .on('mouseover', function (d, i) {

          d3.select(this)
            .transition().duration(transitionsTime)
            .style("fill-opacity", instance.lookAndFeel.petalAreaOpacityActive);

          instance.showTooltip(d, radius);
          instance.showIndividualDataInset(d, i, radius);

        })
        .on('mouseout', function () {

          d3.select(this)
            .transition().duration(transitionsTime)
            .style("fill-opacity", instance.lookAndFeel.petalAreaOpacity);

          instance.hideTooltip();
          instance.hideIndividualDataInset();

        })
        .transition().duration(transitionsTime)
        .style("fill-opacity", this.lookAndFeel.petalAreaOpacity)
      ;

      newPetals
        .append('path')
        .style("stroke-opacity", 0)
        .transition().duration(transitionsTime)
        .attr("class", "petalsLine")
        .attr("d", <any>petalLine)
        .style("stroke-width", this.lookAndFeel.petalLineWidth)
        .style("stroke", colorsFun)
        .style("fill", "none")
        .style("stroke-opacity", 1)
      ;
      //.style("filter" , "url(#glow)");

      //Append the circles
      newPetals
        .append("circle")
        .attr("class", "petalsCircle")
        .attr("cx", function (d: PetalNode, i) {
          return radius * d.polarCoordinates[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("cy", function (d: PetalNode, i) {
          return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("r", this.lookAndFeel.petalCircleRadius)
        .style("fill", colorsFun)
        .style("fill-opacity", this.lookAndFeel.petalCircleOpacity);

      petals.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

    });

  }


  plotIndividualDataInset(dataGroups: number[][], domain: number[], showSelected: boolean,
                          mainPane: Selection<SVGGElement, any, null, undefined>, radius: number) {

    if (!this.individualDotsInsetWrapper) {
      this.individualDotsInsetWrapper = mainPane.append<SVGGElement>("g").attr("class", "dotsInset");
    }

    if (showSelected) {
      //append group index to the data so the colors can be generated for each data point (ix is for the parrent so it would
      //not be available
      this.individualPolarData = dataGroups.map((g, ix) => g.map(a => {
        let v = this.polarUtil.calculatePolarCoordinate(a, domain);
        v.push(ix);
        return v;
      }));

    }
    //the actual plotting happens in showIndividuals as it is data depended

    //we always hide it with new data first;
    this.hideIndividualDataInset();
  }

  hideIndividualDataInset() {
    if (!this.individualDotsInsetWrapper || !this.individualPolarData) {
      return;
    }

    this.individualDotsInsetWrapper
      .style('opacity', 0.0);
  }

  showIndividualDataInset(p: PetalNode, ix: number, radius: number) {

    if (!this.individualDotsInsetWrapper || !this.individualPolarData || !this.showSelectedIndividuals) {
      return;
    }

    //console.log("P: "+p.polarCoordinates[0], p.polarCoordinates);

    const transitionsTime = this.lookAndFeel.baseTransitionsTime / 2;

    let d3 = this.d3;

    let individuals = this.individualPolarData[ix];

    //let pallete = BD2ColorPalette.indexPalette(this.individualPolarData.length);
    let colorsFun = (d: any) => this.dataPallete[d[3]];


    let dots = this.individualDotsInsetWrapper.selectAll(".dotsCircle")
      .data(individuals);

    //existing dots
    dots
      .interrupt()
      .style('opacity', 0.2)
      .attr("cx", radius * p.polarCoordinates[0])
      .attr("cy", radius * p.polarCoordinates[1])
      .style("stroke", colorsFun)
      .style("fill", colorsFun)
      .transition().duration(transitionsTime)
      .style('opacity', 1)
      .attr("cx", function (d: number[], i) {
        return radius * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr("cy", function (d: number[], i) {
        return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      });

    //new dots
    dots.enter()
      .append("circle")
      .style('opacity', 0.2)
      .attr("class", "dotsCircle")
      .attr("cx", radius * p.polarCoordinates[0])
      .attr("cy", radius * p.polarCoordinates[1])
      .attr("r", this.lookAndFeel.dotsCircleRadius)
      .style("stroke-width", this.lookAndFeel.dotsCircleStrokeWidth)
      .style("stroke", colorsFun)
      .style("fill", colorsFun)
      .style("fill-opacity", this.lookAndFeel.dotsCircleFillOpacity)
      .transition().duration(transitionsTime)
      .style('opacity', 1)
      .attr("cx", function (d: number[], i) {
        return radius * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr("cy", function (d: number[], i) {
        return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      });

    //exit
    dots.exit()
      .remove();

    this.individualDotsInsetWrapper
      .style('opacity', 1);
  }


  plotAllDataDots(dataGroups: number[][], domain: number[], showDots: boolean,
    pallete: string[],
                  mainPane: Selection<SVGGElement, any, null, undefined>, radius: number) {


    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    let d3 = this.d3;


    if (!this.dotsWrapper) {
      this.dotsWrapper = mainPane.append<SVGGElement>("g").attr("class", "dotsWrapper");
    }
    let dotsWrapper = this.dotsWrapper;

    if (!showDots) {
      this.dotsWrapper.style('opacity', 0.0);
      return;
    } else {
      this.dotsWrapper.style('opacity', 1);
    }

    //append group index to the data so the colors can be generated for each data point (ix is for the parrent so it would
    //not be available
    let dotsData = dataGroups.map((g, ix) => g.map(a => {
      let v = this.polarUtil.calculatePolarCoordinate(a, domain);
      v.push(ix);
      return v;
    }));


    //let pallete = BD2ColorPalette.indexPalette(dotsData.length);
    let colorsFun = (d: any) => this.dataPallete[d[3]];

    let instance = this;


    //so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {

      let dotsGroup = dotsWrapper.selectAll(".dotsGroup")
        .data(dotsData);


      let dotsInExisting = dotsGroup.selectAll(".dotsCircle")
        .data(d => d);

      dotsInExisting
        .transition().duration(transitionsTime)
        .attr("cx", function (d: number[], i) {
          return radius * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("cy", function (d: number[], i) {
          return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        });

      dotsInExisting.enter()
        .append("circle")
        .transition().duration(transitionsTime)
        .attr("class", "dotsCircle")
        .attr("cx", function (d: number[], i) {
          return radius * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("cy", function (d: number[], i) {
          return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("r", this.lookAndFeel.dotsCircleRadius)
        .style("stroke-width", this.lookAndFeel.dotsCircleStrokeWidth)
        .style("stroke", colorsFun)
        .style("fill", colorsFun)
        .style("fill-opacity", this.lookAndFeel.dotsCircleFillOpacity);


      dotsInExisting.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

      // dotsGroup enter section
      let dotsInNewGroups = dotsGroup.enter()
        .append<SVGGElement>("g")
        .attr("class", "dotsGroup")
        .selectAll(".dotsCircle")
        .data(d => d);


      dotsInNewGroups.enter()
        .append("circle")
        .transition().duration(transitionsTime)
        .attr("class", "dotsCircle")
        .attr("cx", function (d: number[], i) {
          return radius * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("cy", function (d: number[], i) {
          return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr("r", this.lookAndFeel.dotsCircleRadius)
        .style("stroke-width", this.lookAndFeel.dotsCircleStrokeWidth)
        .style("stroke", colorsFun)
        .style("fill", colorsFun)
        .style("fill-opacity", this.lookAndFeel.dotsCircleFillOpacity);

      //dotsGroup exit section
      dotsGroup.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

    });
  }

  plotAxisGrid(pane: Selection<SVGGElement, any, null, undefined>, radius: number): Selection<SVGGElement, any, null, undefined> {


    if (this.axisGrid) {
      return this.axisGrid; //we only plot grid once
    }

    let axisGrid = this.axisGrid = pane.append<SVGGElement>("g").attr("class", "axisWrapper");


    axisGrid.selectAll(".levels")
      .data([10, 2, 1])
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", function (d, i) {
        return radius / d;
      })
      .style("fill", this.lookAndFeel.gridColor)
      .style("stroke", this.lookAndFeel.gridColor)
      .style("fill-opacity", 0.15);
    //.style("filter" , "url(#glow)");

    let axis = axisGrid.selectAll(".axis")
      .data(
        [0, 3, 6, 9, 12, 15, 18, 21].map(v => this.polarUtil.normalizedPeakToPolar(v, 24)
          //polar coordinates with attached original value for the label
        )
      )
      .enter()
      .append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (d, i) {
        return radius * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr("y2", function (d, i) {
        return radius * d[1]; //Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr("class", "line")
      .style("stroke", this.lookAndFeel.axisColor)
      .style("stroke-dasharray", "5 5")
      .style("stroke-width", this.lookAndFeel.axisWidth);

    axis.append("text")
      .attr("class", "legend")
      //.style("font-size", this.lookAndFeel.axisFontSize) //"10px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", function (d, i) {
        return (radius + 10) * d[0]; //Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr("y", function (d, i) {
        return (radius + 10) * d[1]; //Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .text(function (d, i) {
        return d[2];
      });

    return axisGrid;
  }

  updateAxisLabels(domain: number[], axisGrid: Selection<SVGGElement, any, null, undefined>) {

    let range = domain[1] - domain[0];
    let axis = axisGrid.selectAll(".axis");
    axis.select("text")
      .text(function (d, i) {
        return SmartRounder.round(domain[0] + d[2] / 24 * range);
      });

  }

}
