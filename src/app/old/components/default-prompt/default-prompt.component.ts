import { Component } from '@angular/core';
import { FirestoreService } from '@app/services/firestore.service';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default-prompt',
  templateUrl: './default-prompt.component.html',
  styleUrl: './default-prompt.component.scss'
})
export class DefaultPromptComponent {
  defaultPrompt$: Observable<DocumentData[]>;

  constructor(private firestoreService: FirestoreService) {
    this.defaultPrompt$ = this.firestoreService.getCollection('defaultPrompt');
  }
}

