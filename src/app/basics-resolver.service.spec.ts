import { TestBed } from '@angular/core/testing';

import { BasicsResolverService } from './basics-resolver.service';

describe('BasicsResolverService', () => {
  let service: BasicsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
