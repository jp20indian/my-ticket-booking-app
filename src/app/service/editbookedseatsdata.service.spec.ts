import { TestBed } from '@angular/core/testing';

import { EditbookedseatsdataService } from './editbookedseatsdata.service';

describe('EditbookedseatsdataService', () => {
  let service: EditbookedseatsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditbookedseatsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
