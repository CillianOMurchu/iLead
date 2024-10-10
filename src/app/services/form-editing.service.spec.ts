import { TestBed } from '@angular/core/testing';

import { FormEditingService } from './form-editing.service';

describe('FormEditingService', () => {
  let service: FormEditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormEditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
