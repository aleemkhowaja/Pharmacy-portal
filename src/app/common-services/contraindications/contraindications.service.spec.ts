import { TestBed } from '@angular/core/testing';

import { ContraindicationsService } from './contraindications.service';

describe('ContraindicationsService', () => {
  let service: ContraindicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContraindicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
