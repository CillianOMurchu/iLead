import { Component, signal } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTIONS } from '@app/models/form-definition.model';
import { FirestoreService } from '@app/services/firestore.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  definitions$: Observable<DocumentData[]>;
  defaultPrompt$: Observable<DocumentData[]>;

  readonly panelOpenState = signal(false);

  constructor(private firestoreService: FirestoreService) {
    this.definitions$ = this.firestoreService.getCollection(
      FIRESTORE_COLLECTIONS.DEFINITIONS
    );

    this.defaultPrompt$ = this.firestoreService.getCollection('defaultPrompt');
  }
}
