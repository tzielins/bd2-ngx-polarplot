import { async, fakeAsync, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { D3Service } from 'd3-ng2-service';

import { PolarPlotComponent } from './polar-plot.component';

fdescribe('PolarPlotComponent', () => {
  let component: PolarPlotComponent;
  let fixture: ComponentFixture<PolarPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ PolarPlotComponent ],
      providers: [D3Service]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can create a plot with one data point',async(() => {
    component.data = [[15, 16]];
    component.domain = [12,24];
    component.showIndividuals = "all";

    //have to call it manually fixture detectChanges does not work
    component.ngOnChanges({});
    //fixture.detectChanges();

    fixture.whenStable().then( () => {
      const compiled = fixture.debugElement.nativeElement;

      //the grid
      expect(compiled.querySelector('.polarplot svg')).toBeTruthy();
      expect(compiled.querySelector('.polarplot .axisWrapper')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .gridCircle').length).toBe(3);
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .axis').length).toBe(8);
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .axis line').length).toBe(8);
      expect(compiled.querySelectorAll('.polarplot .axisWrapper .axis .legend').length).toBe(8);
      expect(compiled.querySelector('.polarplot .axisWrapper .axis .legend').textContent).toContain('12');

      //the petal
      expect(compiled.querySelector('.polarplot .petalsWrapper')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .petalsWrapper .petal').length).toBe(1);
      expect(compiled.querySelectorAll('.polarplot .petalsWrapper .petal path').length).toBe(2);
      expect(compiled.querySelectorAll('.polarplot .petalsWrapper .petal circle').length).toBe(1);

      //indiv
      expect(compiled.querySelector('.polarplot .dotsWrapper')).toBeTruthy();
      expect(compiled.querySelectorAll('.polarplot .dotsWrapper .dotsGroup').length).toBe(1);
      expect(compiled.querySelectorAll('.polarplot .dotsWrapper .dotsGroup circle').length).toBe(2);

      //console.log(compiled.querySelectorAll('.polarplot .axisWrapper .gridCircle').constructor.name);
    });

  }));
});
