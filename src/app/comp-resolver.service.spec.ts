import { TestBed } from '@angular/core/testing';

import { CompResolverService } from './comp-resolver.service';

describe('CompResolverService', () => {
  let service: CompResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
