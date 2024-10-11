import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  async sendMessageToAI(message: string) {
    const openai = new OpenAI({
      apiKey: environment.chatGPTKey,
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: 'Write a haiku about recursion in programming.',
        },
      ],
    });

    console.log('completion', completion);
    return completion.choices[0].message;
    // const openai = new OpenAI();

    // console.log('message to send', message);
    // try {
    //   // Realiza la solicitud a la API de OpenAI utilizando axios
    //   let configuration = new Configuration({ apiKey: environment.chatGPTKey });
    //   const response = await axios.post(
    //     'https://api.openai.com/v1/chat/completions',
    //     {
    //       model: 'gpt-4o-mini',
    //       temperature: 0,
    //       messages: [
    //         {
    //           role: 'system',
    //           content:
    //             'follow the instructions given to you and respond with a valid json object',
    //         },
    //         {
    //           role: 'user',
    //           content: message,
    //         },
    //       ],
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${environment.chatGPTKey}`,
    //       },
    //     }
    //   );
    //   // Devuelve la respuesta generada por la IA
    //   return response.data.choices[0].message.content.trim();
    // } catch (error) {
    //   console.error('Error al enviar la pregunta a la API de OpenAI:', error);
    //   throw error;
    // }
  }
}
