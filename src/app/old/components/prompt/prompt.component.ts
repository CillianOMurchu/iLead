import { Component } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FIRESTORE_COLLECTIONS } from '@app/models/form-definition.model';
import { FirestoreService } from '@app/services/firestore.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss',
})
export class PromptComponent {
  prompt$: Observable<DocumentData[]>;
  definitions$: Observable<DocumentData[]>;

  formPrompt: FormGroup = new FormGroup({});

  constructor(
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
  ) {
    this.prompt$ = this.firestoreService.getCollection('defaultPrompt');
    this.definitions$ = this.firestoreService.getCollection(
      FIRESTORE_COLLECTIONS.DEFINITIONS
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.formPrompt = this.formBuilder.group({
      objective: [''],
    });
    this.prompt$.subscribe((data) => {
      console.log('data is ', data);
    });
  }

  savePrompt(): void {
    if (this.formPrompt.valid) {
      const result = this.formPrompt.value;
      this.firestoreService.save('newPrompt', result, 'documentId');
    }
  }
}
