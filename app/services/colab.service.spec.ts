import { TestBed } from '@angular/core/testing';

import { ColabService } from './colab.service';

describe('ColabService', () => {
  let service: ColabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
