import { TestBed } from '@angular/core/testing';

import { SubrangeService } from './subrange.service';

describe('SubrangeService', () => {
  let service: SubrangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubrangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
