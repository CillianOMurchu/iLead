import { Component } from '@angular/core';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  value = '';

  messages: string[] = [];

  constructor(private messageService: MessageService) {}

  sendMessage() {
    console.log('sending ', this.value);
    this.messages.push(`You: ${this.value}`);
    this.messageService.sendMessageToAI(this.value).then((response) => {
      console.log('response', response);
      this.messages.push(`Bot: ${response.content}`);
    });
    this.value = '';
  }
}
