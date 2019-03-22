import { TestBed } from '@angular/core/testing';

import { Bd2NgxPolarplotService } from './bd2-ngx-polarplot.service';

describe('Bd2NgxPolarplotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Bd2NgxPolarplotService = TestBed.get(Bd2NgxPolarplotService);
    expect(service).toBeTruthy();
  });
});
