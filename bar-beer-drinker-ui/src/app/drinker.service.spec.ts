import { TestBed } from '@angular/core/testing';

import { DrinkerService } from './drinker.service';

describe('DrinkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrinkerService = TestBed.get(DrinkerService);
    expect(service).toBeTruthy();
  });
});
