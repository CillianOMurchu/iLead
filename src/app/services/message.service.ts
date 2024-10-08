import { Injectable, model } from '@angular/core';
import { PromptService } from '@app/services/prompt.service';
import axios from 'axios';
import { environment } from 'environments/environment';

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
          model: 'gpt-4o-mini',
          temperature: 0,
          messages: [
            {
              role: 'system',
              content:
                'follow the instructions given to you and respond with a valid json object',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${environment['OPENAI_API_KEY']}`,
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
