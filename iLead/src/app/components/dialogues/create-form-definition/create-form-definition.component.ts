import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarService } from '@services/snack-bar.service';
import {
  FormDefinitionFieldModel,
  FormDefinitionModel,
} from '@app/models/form-definition.model';
import { LocalStorageService } from '@app/services/local-storage.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.savedDefinitions = this.localStorageService.getDefinitions() ?? [];
    console.log('savedDefinitions is ', this.savedDefinitions);
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
      this.snackBarService.openSnackBar('Form Definition Saved');
      this.localStorageService.saveDefinitions(this.savedDefinitions);
    }
  }
}
