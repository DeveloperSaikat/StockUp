import { TestBed } from '@angular/core/testing';

import { CompProfService } from './comp-prof.service';

describe('CompProfService', () => {
  let service: CompProfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompProfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
