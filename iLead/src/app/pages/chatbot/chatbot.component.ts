import { Component } from '@angular/core';
import { FirestoreService } from '@app/services/firestore.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getCollection('definitions')
  }

}
