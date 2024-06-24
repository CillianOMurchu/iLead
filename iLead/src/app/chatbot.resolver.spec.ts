import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { chatbotResolver } from './chatbot.resolver';

describe('chatbotResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => chatbotResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
