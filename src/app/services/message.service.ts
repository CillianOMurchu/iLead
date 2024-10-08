import { Injectable, model } from '@angular/core';
import { PromptService } from '@app/services/prompt.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private promptService: PromptService) {}

  async sendMessageToAI(message: string) {
    console.log('message to send', message);

    try {
      // Realiza la solicitud a la API de OpenAI utilizando axios
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          max_tokens: 50,
          temperature: 0,
          stop: '\n',

          model: 'gpt-4o',
          response_format: {
            type: 'json_object',
          },
          messages: [
            {
              role: 'user',
              content: message,
            },
            {
              role: 'system',
              content:
                'Your response should be a valid json. Get the clients name, email and DOB. use the variable reply to speak to the client. Use name, email and DOB ',
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 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',
          },
        }
      );
      // Devuelve la respuesta generada por la IA
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error al enviar la pregunta a la API de OpenAI:', error);
      throw error;
    }
  }
}
