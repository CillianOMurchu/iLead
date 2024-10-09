import { Injectable } from '@angular/core';
import { FormDefinition } from '@app/models/form-definition.model';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  constructor() {}

  getDefinitionPrompt(result: FormDefinition): string {
    return result.prompt || 'No prompt';
  }
}
