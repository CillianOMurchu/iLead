import { Injectable } from '@angular/core';
import {
  FormDefinitionFieldModel,
  FormDefinitionModel,
} from '@app/models/form-definition.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveDefinitions(definitions: FormDefinitionModel[]) {
    localStorage.setItem('definitions', JSON.stringify(definitions));
  }

  getDefinitions(): FormDefinitionModel[] | null {
    const result = localStorage.getItem('definitions');
    if (!result) {
      return null;
    }
    return JSON.parse(result);
  }
}
