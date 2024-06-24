import { Component } from '@angular/core';
import { FIRESTORE_COLLECTIONS } from '@app/models/form-definition.model';
import { DialogService } from '@app/services/dialog.service';
import { FirestoreService } from '@app/services/firestore.service';
import type { DocumentData } from 'firebase/firestore';
import type { Observable } from 'rxjs';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  definitions$: Observable<DocumentData[]> | undefined;

  constructor(
    private firestoreService: FirestoreService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.definitions$ = this.firestoreService.getCollection(
      FIRESTORE_COLLECTIONS.DEFINITIONS
    );
  }

  editDefinition(definition: DocumentData): void {
    this.dialogService.openEditFormDefinitionDialog(
      definition
    );
  }
}
