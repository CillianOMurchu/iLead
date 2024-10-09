import { Component, signal } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTIONS } from '@app/models/form-definition.model';
import { FirestoreService } from '@app/services/firestore.service';
import { Observable } from 'rxjs/internal/Observable';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  definitions$: Observable<DocumentData[]>;

  defaultPrompt$: Observable<DocumentData[]>;

  messages: string[] = [];

  inputMessage = '';

  readonly panelOpenState = signal(false);

  constructor(
    private firestoreService: FirestoreService,
    private messageService: MessageService
  ) {
    this.definitions$ = this.firestoreService.getCollection(
      FIRESTORE_COLLECTIONS.DEFINITIONS
    );

    this.defaultPrompt$ = this.firestoreService.getCollection('defaultPrompt');
  }

  addMessage(message: string, sender: string) {
    this.messages.push(`${sender}: ${message}`);
  }

  // Evento al hacer clic en el botón de enviar mensaje
  async onClick() {
    console.log('Mensaje:', this.inputMessage);
    const message = this.inputMessage.trim();
    if (message !== '') {
      this.addMessage(message, 'Chilliano');
      this.inputMessage = ''; // Limpiar el campo de entrada
      try {
        // Enviar mensaje a la IA y obtener respuesta
        const aiResponse = await this.messageService.sendMessageToAI(message);
        this.addMessage(aiResponse, 'IA');
      } catch (error) {
        this.addMessage('¡Oops! Algo salió mal.', 'IA');
      }
    }
  }
}
