import { TestBed } from '@angular/core/testing';

import { PharmaceuticalFormService } from './pharmaceutical-form.service';

describe('PharmaceuticalFormService', () => {
  let service: PharmaceuticalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmaceuticalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
