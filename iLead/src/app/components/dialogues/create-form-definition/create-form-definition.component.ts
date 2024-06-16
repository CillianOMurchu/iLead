import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from '@services/snack-bar.service';
import {
  FormDefinitionField,
  FormDefinition,
  type FormDefinitionDialogData,
} from '@app/models/form-definition.model';
import { LocalStorageService } from '@app/services/local-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-form-definition',
  templateUrl: './create-form-definition.component.html',
  styleUrls: ['./create-form-definition.component.scss'],
})
export class CreateFormDefinitionComponent {
  private backupFormDefinition: Partial<FormDefinition> = {
    ...this.data.definition,
  };

  formDefinition: FormGroup = new FormGroup({});

  formFields: FormDefinitionField[] = [];

  formDefinitionField: FormGroup = new FormGroup({});

  savedDefinitions: FormDefinition[] | null = [];

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<CreateFormDefinitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDefinitionDialogData
  ) {}

  ngOnInit() {
    this.buildForm();
    // this.savedDefinitions = this.localStorageService.getDefinitions() ?? [];
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
    // console.log('event is ', event);
    // const currentDefinitions = this.localStorageService.getDefinitions();
    // const filteredDefinitions = currentDefinitions?.filter(
    //   (definition) => definition.id !== event.id
    // );
    // console.log('filteredDefinitions are ', filteredDefinitions);
    // if (!filteredDefinitions || filteredDefinitions.length === 0) {
    //   this.localStorageService.deleteDefinitions();
    //   this.savedDefinitions = [];
    // }
    // if (filteredDefinitions) {
    //   this.localStorageService.saveDefinitions(filteredDefinitions);
    //   this.savedDefinitions = this.localStorageService.getDefinitions();
    // }
    // console.log('current definitions are ', currentDefinitions);
  }

  saveDefinition() {
    if (this.formDefinition.valid) {
      const result = this.formDefinition.value;
      result.fields = this.formFields;
      console.log('wanna save ', result);
      this.dialogRef.close({ definition: result });
      //   const mathId = Math.random().toString(16).slice(2);
      //   result.id = mathId;
      //   console.log('result is ', result);
      //   this.savedDefinitions?.push(result);
      //   this.formDefinition.reset();
      //   this.snackBarService.openSnackBar('Form Definition Saved');
      //   this.localStorageService.saveDefinitions(this.savedDefinitions);
      //   this.buildForm();
    }
  }
}
