import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { D3Service } from 'd3-ng2-service';

import { PolarPlotComponent } from './polar-plot.component';

describe('PolarPlotComponent', () => {
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
});
