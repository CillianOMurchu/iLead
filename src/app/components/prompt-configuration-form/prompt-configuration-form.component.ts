import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { FormEditingService } from '@app/services/form-editing.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private formEditingService: FormEditingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.buildForm();
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
    this.snackBarService.openSnackBar('Go to chatbot and try it out');
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

  getFormConfig() {
    console.log('this.formDefinition.value si ', this.formDefinition.value);
    return { form: this.formDefinition.value, types: this.formFields };
  }

  saveDefinition(): void {
    if (this.formDefinition.valid) {
      const result = this.formDefinition.value;
      result.fields = this.formFields;
      this.formEditingService.save({ definition: result });
    }
  }
}
