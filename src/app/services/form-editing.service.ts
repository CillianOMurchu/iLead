import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/old/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FormEditingService {
  constructor(private localStorageService: LocalStorageService) {}

  save(form: any): void {
    this.localStorageService.setItem(
      'currentlyEditingForm',
      JSON.stringify(form)
    );
  }

  getCurrentPrompt(): any {
    const result = this.localStorageService.getItem('currentlyEditingForm');
    if (!result) {
      return null;
    }
    return JSON.parse(result);
  }
}
