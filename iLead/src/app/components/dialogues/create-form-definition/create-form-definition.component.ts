import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FormDefinitionField,
  type FormDefinitionDialogData,
} from '@app/models/form-definition.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-form-definition',
  templateUrl: './create-form-definition.component.html',
  styleUrls: ['./create-form-definition.component.scss'],
})
export class CreateFormDefinitionComponent {
  formDefinition: FormGroup = new FormGroup({});

  formFields: FormDefinitionField[] = [];

  formDefinitionField: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateFormDefinitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDefinitionDialogData
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.formDefinition = this.formBuilder.group({
      name: [''],
      context: [''],
    });
    this.formDefinitionField = this.formBuilder.group({
      label: [''],
      type: [''],
    });
  }

  addField(): void {
    if (this.formDefinitionField.valid) {
      this.formFields.push(this.formDefinitionField.value);
      this.formDefinitionField.reset();
    }
  }

  saveDefinition(): void {
    if (this.formDefinition.valid) {
      const result = this.formDefinition.value;
      result.fields = this.formFields;
      this.dialogRef.close({ definition: result });
    }
  }
}
