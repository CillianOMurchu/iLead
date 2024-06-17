import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormDefinition,
  type FormDefinitionDialogData,
} from '@app/models/form-definition.model';

@Component({
  selector: 'app-edit-form-definition',
  templateUrl: './edit-form-definition.component.html',
  styleUrl: './edit-form-definition.component.scss',
})
export class EditFormDefinitionComponent {
  private backupDefinition: Partial<FormDefinition> = {
    ...this.data.definition,
  };

  constructor(
    public dialogRef: MatDialogRef<FormDefinitionDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: FormDefinitionDialogData
  ) {}

  cancel(): void {
    this.data.definition.name = this.backupDefinition.name;
    this.data.definition.context = this.backupDefinition.context;
    this.data.definition.fields = this.backupDefinition.fields;
    this.data.definition.id = this.backupDefinition.id;
    this.dialogRef.close();
  }
}
