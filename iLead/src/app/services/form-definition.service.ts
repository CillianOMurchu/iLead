import { Injectable } from '@angular/core';
import { type FormDefinition } from '@app/models/form-definition.model';
import { DialogService } from '@app/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class FormDefinitionService {
  constructor(private dialogService: DialogService) {}

  editDefinition(definition: FormDefinition): void {
    this.dialogService.openEditFormDefinitionDialog(definition);
  }
}
