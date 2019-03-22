import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bd2NgxPolarplotComponent } from './bd2-ngx-polarplot.component';

describe('Bd2NgxPolarplotComponent', () => {
  let component: Bd2NgxPolarplotComponent;
  let fixture: ComponentFixture<Bd2NgxPolarplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bd2NgxPolarplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bd2NgxPolarplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
