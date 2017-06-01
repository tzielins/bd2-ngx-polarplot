import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
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
import {D3, d3, Selection} from "../../d3service";
import {PolarDomainUtil} from "../polar-domain-util";
import {SmartRounder} from "../smart-rounding";
import {PetalNode, PolarPoint} from "../polar-plot.dom";
import {BD2ColorPalette} from "../color-palette";



/**


 */

export type ShowIndividualsOptions = "none" | "all" | "selected";

export class GraphicContext {

  palette: string[];

  mainPane: Selection<SVGGElement, any, null, undefined>;
  axisGrid: Selection<SVGGElement, any, null, undefined>;
  petalsWrapper: Selection<SVGGElement, any, null, undefined>;
  dotsWrapper: Selection<SVGGElement, any, null, undefined>;
  individualDotsInsetWrapper: Selection<SVGGElement, any, null, undefined>;
  tooltip: Selection<SVGGElement, any, null, undefined>;
  tooltipText: Selection<SVGGElement, any, null, undefined>;
  tooltipBox: Selection<SVGGElement, any, null, undefined>;

  radius: number;
}

export class LookAndFeel {
  baseTransitionsTime = 400;

  gridColor = "#CDCDCD";
  axisColor = "white";
  axisWidth = "2px";

  //done by css
  //axisFontSize: "10px",
  //tooltipFontSize: "11px",

  dotsCircleRadius = 4;
  dotsCircleStrokeWidth = '1px';
  dotsCircleFillOpacity = 0.5;

  petalAreaOpacity = 0.35;
  petalAreaOpacityActive = 0.7;
  petalLineWidth = "3px";
  petalCircleRadius = 4;
  petalCircleOpacity = 0.8;

};


@Component({
  selector: 'bd2-ngx-polar-plot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="polarplot"></div>
  `,
  styles: [
    `
      :host /deep/ .axis .legend  {
        font-size: 13px;
      }

      :host /deep/ .tooltip  {
        font-size: 14px;
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

  @Input()
  palette: string[] = [];

  @Input()
  labels: string[] = [];

  @Input()
  lookAndFeel = new LookAndFeel();

  @Output()
  colors = new EventEmitter<string[]>()

  private d3: D3;
  private parentNativeElement: any;
  private polarUtil: PolarDomainUtil;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;


  private _domain: number[];
  private showAllIndividuals = false;
  private showSelectedIndividuals = false;

  private individualPolarData: PolarPoint[][];

  private graphicContext = new GraphicContext();




  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef, element: ElementRef) {
    this.d3 = d3;
    //this.d3 = d3Service.getD3();
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

    //console.log("Changes", changes);

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


  initializeSvg(): GraphicContext {

    let pWidth = 500;
    let pHeight = 500;

    let d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3Svg = d3ParentElement.select('.polarplot').append<SVGSVGElement>('svg');


    this.d3Svg.attr('width', '100%')
      .attr('viewBox', '0 0 ' + pWidth + ' ' + pHeight);

    let context = new GraphicContext();
    context.mainPane = this.d3Svg.append<SVGGElement>('g')
      .attr('transform', 'translate(' + (pWidth / 2) + ',' + (pHeight / 2) + ')'); //moves 0,0 of the pain to the middle of the graphics

    context.radius = Math.min(pWidth, pHeight) / 2 - 30;
    return context;
  }

  prepareTooltip(context: GraphicContext): GraphicContext {

    if (!context.tooltip) {
      //Set up the small tooltip for when you hover over a circle
      context.tooltip = <any>context.mainPane.append<SVGGElement>('g')
            .classed("tooltipWrapper", true);

      context.tooltipBox = context.tooltip.append<SVGGElement>("rect")
            .style("fill", "white")
            .style("fill-opacity", 0.8)
            .style("stroke", "grey")
          //.style("visibility", "hidden");
          ;


      context.tooltipText = <any>context.tooltip.append("text")
        .attr("class", "tooltip")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        //.style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
        .style("opacity", 1)
        ;

        context.tooltip
          .style("visibility", "hidden");
    }
    return context;
  }

  showTooltip(p: PetalNode, radius: number) {



    this.graphicContext.tooltipText
      .attr('x', (radius + 15) * p.polarCoordinates[0])
      .attr('y', (radius + 15) * p.polarCoordinates[1])
      .text(p.roundedPeak)
      //.transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
      //.style('opacity', 1);
      ;

      let bbox = this.graphicContext.tooltipText.node().getBBox();

      this.graphicContext.tooltipBox
        .attr("x", bbox.x - 3)
        .attr("y", bbox.y - 2)
        .attr("width", bbox.width + 6)
        .attr("height", bbox.height + 4);

      this.graphicContext.tooltip
        .style("visibility", "visible");
  }

  hideTooltip() {
    //this.graphicContext.tooltip
      //.transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
      //.style("opacity", 0);

      this.graphicContext.tooltip
        .style("visibility", "hidden");
  }



  updatePlot() {

    if (!this.d3Svg) {
      this.graphicContext = this.initializeSvg();

      this.graphicContext = this.plotAxisGrid(this.graphicContext);
    }


    //the grid is plotted only once, only the lables are updated
    this.updateAxisLabels(this._domain, this.graphicContext.axisGrid);

    this.graphicContext = this.updatePalette(this.data,this.palette,this.graphicContext);

    let petalNodes = this.polarUtil.dataToPetals(this.data, this._domain, this.scaleRadius, this.scaleWidth, this.errors);
    this.colorPetals(petalNodes, this.graphicContext.palette);
    //remove empty data
    petalNodes = petalNodes.filter( n => !isNaN(n.peak));

    this.individualPolarData = this.prepareIndividualPolarData(this.data, this._domain, this.graphicContext.palette);
    this.individualPolarData = this.individualPolarData.filter( d => d.length !== 0);

    this.graphicContext = this.plotDataPetals(petalNodes, this.scaleRadius, this.scaleWidth, this.graphicContext);

    this.graphicContext = this.plotAllDataDots(this.individualPolarData, this.showAllIndividuals, this.graphicContext);

    this.graphicContext = this.prepareIndividualDataInset(this.graphicContext);

    this.graphicContext = this.prepareTooltip(this.graphicContext);

  }

  updatePalette(data: any[], palette: string[], context: GraphicContext): GraphicContext {
    if (!palette || palette.length === 0) {
      palette = BD2ColorPalette.palette(data.length);
    }

    palette = BD2ColorPalette.extendPalette(palette, data.length);
    context.palette = palette;
    this.colors.next(palette.slice());
    return context;
  }

  colorPetals(petals: PetalNode[], palette: string[]) {
    petals.forEach( (b,ix) => b.color = palette[ix]);
  }

  plotDataPetals(petalNodes: PetalNode[],
                 scaleRadius: boolean, scaleWidth: boolean,
                 context: GraphicContext): GraphicContext {

    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    let d3 = this.d3;
    let radius = context.radius;

    if (!context.petalsWrapper) {
      context.petalsWrapper = context.mainPane.append<SVGGElement>("g").attr("class", "petalsWrapper");
    }

    let petalsWrapper = context.petalsWrapper;

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
        .attr("d", <any>petalLine)
        .on('interrupt', function(d,ix) {
          d3.select(this).attr("d", <any>petalLine);
        })
        ;

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
        .style("fill", d => d.color)
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
        .style("stroke", d => d.color)
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
        .style("fill", d => d.color)
        .style("fill-opacity", this.lookAndFeel.petalCircleOpacity);

      petals.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

    });

    return context;
  }


  prepareIndividualPolarData(dataGroups: number[][], domain: number[], palette: string[]): PolarPoint[][] {
    //append group index to the data so the colors can be generated for each data point (ix is for the parrent so it would
    //not be available
    return dataGroups.map((g, ix) => g.map(a => {
      let v = new PolarPoint(this.polarUtil.calculatePolarCoordinate(a, domain), palette[ix]);
      return v;
    }));
  }

  prepareIndividualDataInset(context: GraphicContext): GraphicContext {

    if (!context.individualDotsInsetWrapper) {
      context.individualDotsInsetWrapper = context.mainPane.append<SVGGElement>("g").attr("class", "dotsInset");
    }

    //the actual plotting happens in showIndividuals as it is data depended

    //we always hide it with new data first;
    this.hideIndividualDataInset();
    return context;
  }

  hideIndividualDataInset() {
    if (!this.graphicContext.individualDotsInsetWrapper) {
      return;
    }

    this.graphicContext.individualDotsInsetWrapper
      .style('opacity', 0.0);
  }

  showIndividualDataInset(p: PetalNode, ix: number, radius: number) {

    if (!this.graphicContext.individualDotsInsetWrapper || !this.individualPolarData || !this.showSelectedIndividuals) {
      return;
    }

    //console.log("P: "+p.polarCoordinates[0], p.polarCoordinates);

    const transitionsTime = this.lookAndFeel.baseTransitionsTime / 2;

    let d3 = this.d3;

    let individuals = this.individualPolarData[ix];



    let dots = this.graphicContext.individualDotsInsetWrapper.selectAll(".dotsCircle")
      .data(individuals);

    //existing dots
    dots
      .interrupt()
      .style('opacity', 0.2)
      .attr("cx", radius * p.polarCoordinates[0])
      .attr("cy", radius * p.polarCoordinates[1])
      .style("stroke", p.color)
      .style("fill", p.color)
      .transition().duration(transitionsTime)
      .style('opacity', 1)
      .attr("cx", d => radius * d.xy[0])
      .attr("cy", d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      ;

    //new dots
    dots.enter()
      .append("circle")
      .style('opacity', 0.2)
      .attr("class", "dotsCircle")
      .attr("cx", radius * p.polarCoordinates[0])
      .attr("cy", radius * p.polarCoordinates[1])
      .attr("r", this.lookAndFeel.dotsCircleRadius)
      .style("stroke-width", this.lookAndFeel.dotsCircleStrokeWidth)
      .style("stroke", p.color)
      .style("fill", p.color)
      .style("fill-opacity", this.lookAndFeel.dotsCircleFillOpacity)
      .transition().duration(transitionsTime)
      .style('opacity', 1)
      .attr("cx", d => radius * d.xy[0])
      .attr("cy", d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      ;
    //exit
    dots.exit()
      .remove();

    this.graphicContext.individualDotsInsetWrapper
      .style('opacity', 1);
  }


  plotAllDataDots(dotsData: PolarPoint[][], showDots: boolean,
                  context: GraphicContext): GraphicContext {


    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    let d3 = this.d3;
    let radius = context.radius;

    if (!context.dotsWrapper) {
      context.dotsWrapper = context.mainPane.append<SVGGElement>("g").attr("class", "dotsWrapper");
    }
    let dotsWrapper = context.dotsWrapper;

    if (!showDots) {
      context.dotsWrapper.style('opacity', 0.0);
      return context;
    } else {
      context.dotsWrapper.style('opacity', 1);
    }

    let instance = this;


    //so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {

      let dotsGroup = dotsWrapper.selectAll(".dotsGroup")
        .data(dotsData);


      let dotsInExisting = dotsGroup.selectAll(".dotsCircle")
        .data(d => d);

      dotsInExisting
        .transition().duration(transitionsTime)
        .attr("cx", d => radius * d.xy[0])
        .attr("cy", d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        ;

      dotsInExisting.enter()
        .append("circle")
        .transition().duration(transitionsTime)
        .attr("class", "dotsCircle")
        .attr("cx", d => radius * d.xy[0])
        .attr("cy", d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr("r", this.lookAndFeel.dotsCircleRadius)
        .style("stroke-width", this.lookAndFeel.dotsCircleStrokeWidth)
        .style("stroke", d => d.color)
        .style("fill", d => d.color)
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
        .attr("cx", d => radius * d.xy[0])
        .attr("cy", d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr("r", this.lookAndFeel.dotsCircleRadius)
        .style("stroke-width", this.lookAndFeel.dotsCircleStrokeWidth)
        .style("stroke", d => d.color)
        .style("fill", d => d.color)
        .style("fill-opacity", this.lookAndFeel.dotsCircleFillOpacity);

      //dotsGroup exit section
      dotsGroup.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

    });

    return context;
  }

  plotAxisGrid(context: GraphicContext): GraphicContext {


    if (context.axisGrid) {
      return context; //this.axisGrid; //we only plot grid once
    }

    let radius = context.radius;
    let axisGrid = context.axisGrid = context.mainPane.append<SVGGElement>("g").attr("class", "axisWrapper");


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

    return context;
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
