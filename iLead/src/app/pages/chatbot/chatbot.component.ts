import { Component } from '@angular/core';
import { FIRESTORE_COLLECTIONS } from '@app/models/form-definition.model';
import { DialogService } from '@app/services/dialog.service';
import { FirestoreService } from '@app/services/firestore.service';
import { QueryService } from '@app/services/openai.service';
import type { DocumentData } from 'firebase/firestore';
import type { Observable } from 'rxjs';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  definitions$: Observable<DocumentData[]> | undefined;

  userInput: string = '';

  // response$:
  //   | Observable<{
  //       loading: boolean;
  //       data?: string;
  //     }>
  //   | undefined;

  constructor(
    private firestoreService: FirestoreService,
    private dialogService: DialogService,
    // private queryService: QueryService
  ) {}

  ngOnInit() {
    this.definitions$ = this.firestoreService.getCollection(
      FIRESTORE_COLLECTIONS.DEFINITIONS
    );
  }

  sendQuery(query: string): void {
    // this.response$ = this.queryService.sendQuery(query);
    // .subscribe(
    //   (response) => {
    //     console.log('Response from server:', response);
    //     // Handle response from server as needed
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //     // Handle error
    //   }
    // );
    // console.log('this.userInput is ', this.userInput);
    // this.response$ = this.queryService.sendQuery(query);
  }

  editDefinition(definition: DocumentData): void {
    this.dialogService.openEditFormDefinitionDialog(definition);
  }
}
