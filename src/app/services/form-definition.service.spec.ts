import { TestBed } from '@angular/core/testing';

import { FormDefinitionService } from './form-definition.service';

describe('FormDefinitionService', () => {
  let service: FormDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
