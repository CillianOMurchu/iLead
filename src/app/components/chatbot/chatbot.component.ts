import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  value = '';

  messages: string[] = [];

  sendMessage() {
    console.log('sending ', this.value);
    this.messages.push(`You: ${this.value}`);
    this.value = '';
  }
}
