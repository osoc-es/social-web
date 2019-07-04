import { TestBed } from '@angular/core/testing';

import { AUTHService } from './auth.service';

describe('AUTHService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AUTHService = TestBed.get(AUTHService);
    expect(service).toBeTruthy();
  });
});
