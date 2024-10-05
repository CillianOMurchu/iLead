import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { type FormDefinitionDialogData } from '@app/models/form-definition.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromptService } from '@app/services/prompt.service';
import { FirestoreService } from '@app/services/firestore.service';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentData } from '@angular/fire/firestore';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-create-form-definition',
  templateUrl: './create-form-definition.component.html',
  styleUrls: ['./create-form-definition.component.scss'],
})
export class CreateFormDefinitionComponent {
  formDefinition: FormGroup = new FormGroup({});
  formFields: { label: string; type: any }[] = [];
  defaultPrompt$: Observable<DocumentData[]>;
  displayedPrompt = '';
  defaultPromptString = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateFormDefinitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDefinitionDialogData,
    public promptService: PromptService,
    private firestoreService: FirestoreService
  ) {
    this.defaultPrompt$ = this.firestoreService.getCollection('defaultPrompt');
  }

  ngOnInit() {
    this.setDisplayedPrompt();
    this.buildForm();
  }
  setDisplayedPrompt(): void {
    this.defaultPrompt$.pipe(take(1)).subscribe((res) => {
      if (res && res.length > 0) {
        this.defaultPromptString = res[0]['prompt'];
        this.displayedPrompt = res[0]['prompt'];
      }
    });
  }

  updatePrompt(): void {
    const company = this.promptVariables.value[0]?.company;
    const objective = this.promptVariables.value[0]?.objective;
    const context = this.promptVariables.value[0]?.context;

    this.displayedPrompt = this.defaultPromptString
      .replace('<var>company<var>', company)
      .replace('<var>context</var>', context)
      .replace('<var>objective</var>', objective)
      .replace('<var>index.fields</var>', JSON.stringify(this.formFields));
  }

  removePromptVariable(index: number): void {
    this.promptVariables.removeAt(index);
  }

  buildForm(): void {
    this.formDefinition = this.formBuilder.group({
      name: [''],
      promptVariables: this.formBuilder.array([
        this.formBuilder.group({
          company: ['', Validators.required],
          context: ['', Validators.required],
          objective: ['', Validators.required],
        }),
      ]),
      fields: this.formBuilder.array([
        this.formBuilder.group({
          label: [''],
          type: [''],
        }),
      ]),
    });
  }

  get fields(): FormArray {
    return this.formDefinition.get('fields') as FormArray;
  }

  get promptVariables(): FormArray {
    return this.formDefinition.get('promptVariables') as FormArray;
  }

  addField(): void {
    if (!this.fields) {
      return;
    }

    const isValid = this.fields.valid;

    if (isValid) {
      this.formFields.push(this.fields.value[0]);
      this.fields.reset();
    }

    console.log('this.formFields is now ', this.formFields);
  }

  saveDefinition(): void {
    if (this.formDefinition.valid) {
      const result = this.formDefinition.value;
      result.fields = this.formFields;
      result.prompt = this.displayedPrompt;
      console.log('result is ', result);
      this.dialogRef.close({ definition: result });
    }
  }
}
