import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  @ViewChild('messagesDiv') private messagesDiv: ElementRef | undefined;

  value = '';

  messages: string[] = [];

  constructor(public messageService: MessageService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.messagesDiv) {
      try {
        this.messagesDiv.nativeElement.scrollTop =
          this.messagesDiv.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }

  sendMessage() {
    this.messages.push(`You: ${this.value}`);
    this.messageService.sendMessageToAI(this.value).then((response) => {
      if (response) {
        this.messages.push(response);
      }
    });
    this.value = '';
  }
}
