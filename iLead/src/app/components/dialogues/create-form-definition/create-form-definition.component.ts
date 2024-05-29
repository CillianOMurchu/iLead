import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarService } from '@services/snack-bar.service';
import {
  FormDefinitionFieldModel,
  FormDefinitionModel,
} from '@app/models/form-definition.model';
import { LocalStorageService } from '@app/services/local-storage.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-create-form-definition',
  templateUrl: './create-form-definition.component.html',
  styleUrls: ['./create-form-definition.component.scss'],
})
export class CreateFormDefinitionComponent {
  formDefinition: FormGroup = new FormGroup({});

  formFields: FormDefinitionFieldModel[] = [];

  formDefinitionField: FormGroup = new FormGroup({});

  savedDefinitions: FormDefinitionModel[] | null = [];

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

  deleteDefinition(event: any) {
    console.log('event is ', event);
    const currentDefinitions = this.localStorageService.getDefinitions();
    const filteredDefinitions = currentDefinitions?.filter(
      (definition) => definition.id !== event.id
    );
    console.log('filteredDefinitions are ', filteredDefinitions);

    if (!filteredDefinitions || filteredDefinitions.length === 0) {
      this.localStorageService.deleteDefinitions();
      this.savedDefinitions = [];
    }

    if (filteredDefinitions) {
      this.localStorageService.saveDefinitions(filteredDefinitions);
      this.savedDefinitions = this.localStorageService.getDefinitions();
    }
    console.log('current definitions are ', currentDefinitions);
  }

  saveDefinition() {
    if (this.formDefinition.valid) {
      let result = this.formDefinition.value;
      result.fields = this.formFields;
      const mathId = Math.random().toString(16).slice(2);
      result.id = mathId;
      console.log('result is ', result);
      this.savedDefinitions?.push(result);
      this.formDefinition.reset();
      this.snackBarService.openSnackBar('Form Definition Saved');
      this.localStorageService.saveDefinitions(this.savedDefinitions);
      this.buildForm();
    }
  }
}
