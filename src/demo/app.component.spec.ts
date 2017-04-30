import { TestBed, async } from '@angular/core/testing';

import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {PolarPlotModule} from '../lib/polar-plot/polar-plot.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PolarPlotModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Polar plot demo');
  }));

  it('generateData',()=> {
    const fixture = TestBed.createComponent(AppComponent);
    let data = fixture.componentInstance.generateData();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThanOrEqual(2);
    expect(data.length).toBeLessThan(7);

    expect(data[1].length).toBeGreaterThanOrEqual(1);
    expect(data[1].length).toBeLessThan(6);


    //console.log("D",data);

  })
});
