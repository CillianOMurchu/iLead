import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatStepper } from '@angular/material/stepper';
import { FormEditingService } from '@app/services/form-editing.service';
import { PromptService } from '@app/services/prompt.service';
import { SnackBarService } from '@app/services/snack-bar.service';

@Component({
  selector: 'app-prompt-configuration-form',
  templateUrl: './prompt-configuration-form.component.html',
  styleUrl: './prompt-configuration-form.component.scss',
})
export class PromptConfigurationFormComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  formDefinition: FormGroup = new FormGroup({});
  formFields: { label: string; type: any }[] = [];

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('labelInput') labelInput!: ElementRef;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private formBuilder: FormBuilder,
    private formEditingService: FormEditingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.buildForm();
    const currentPrompt = this.formEditingService.getCurrentPrompt();
    console.log('currentPrompt is ', currentPrompt);
  }

  ngAfterViewInit() {
    this.toggleDrawer();
  }

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  openDrawer(): void {
    if (this.drawer) {
      this.drawer.open();
    }
  }

  closeDrawer(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }

  get fields(): FormArray {
    return this.formDefinition.get('fields') as FormArray;
  }

  get promptVariables(): FormArray {
    return this.formDefinition.get('promptVariables') as FormArray;
  }

  addField(): void {
    const fieldToAdd = this.fields.value[0];
    if (!this.fields || !fieldToAdd.label || !fieldToAdd.type) {
      this.snackBarService.openSnackBar(
        'Please fill out the field label and type'
      );
      return;
    }

    const isValid = this.fields.valid;

    if (isValid) {
      this.formFields.push(this.fields.value[0]);
      this.fields.reset();
      if (this.labelInput) {
        this.labelInput.nativeElement.focus();
      }
    }
  }

  tryItOut() {
    this.saveDefinition();
    this.snackBarService.openSnackBar(
      'Prompt saved and ready to try out in chatbot'
    );
  }

  buildForm(): void {
    this.formDefinition = this.formBuilder.group({
      name: ['test name'],
      promptVariables: this.formBuilder.array([
        this.formBuilder.group({
          company: ['test company', Validators.required],
          context: ['test context', Validators.required],
          objective: ['test objective', Validators.required],
        }),
      ]),
      fields: this.formBuilder.array([
        this.formBuilder.group({
          label: ['test label'],
          type: ['test type'],
        }),
      ]),
    });
  }

  getFormConfig() {
    return { form: this.formDefinition.value, types: this.formFields };
  }

  saveDefinition(): void {
    if (this.formDefinition.valid) {
      const { name, promptVariables } = this.formDefinition.value;
      const result = {
        name,
        promptVariables: promptVariables[0],
        types: this.formFields,
      };

      this.formEditingService.save({ definition: result });
    }
  }

  resetForms() {
    this.stepper.reset();
    this.formFields = [];
  }
}
