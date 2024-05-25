import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormDefinitionFieldModel,
  FormDefinitionModel,
} from '@app/models/form-definition.model';

@Component({
  selector: 'app-create-form-definition',
  templateUrl: './create-form-definition.component.html',
  styleUrls: ['./create-form-definition.component.scss'],
})
export class CreateFormDefinitionComponent {
  formDefinition: FormGroup = new FormGroup({});

  formFields: FormDefinitionFieldModel[] = [];

  formDefinitionField: FormGroup = new FormGroup({});

  savedDefinitions: FormDefinitionModel[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formDefinition = this.formBuilder.group({
      name: [''],
      context: [''],
    });
    this.formDefinitionField = this.formBuilder.group({
      label: [''],
      type: [''],
    });
  }

  addField() {
    if (this.formDefinitionField.valid) {
      this.formFields.push(this.formDefinitionField.value);
      this.formDefinitionField.reset();
    }
  }

  saveDefinition() {
    if (this.formDefinition.valid) {
      let result = this.formDefinition.value;
      result.fields = this.formFields;
      this.savedDefinitions.push(result);
      this.formDefinition.reset();
    }
  }
}
