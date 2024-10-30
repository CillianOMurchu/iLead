import { Injectable } from '@angular/core';
import { FormEditingService } from '@app/services/form-editing.service';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl =
    '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';

  defaultSystemPrompt = '';

  defaultUserPrompt = ``;

  previousHistory: ChatCompletionMessageParam[] = [];

  constructor(private formEditingService: FormEditingService) {
    this.mapValuesToPrompt();
  }

  addMessageToHistory(response: string) {
    this.previousHistory.push({
      role: 'system',
      content: response,
    });
  }

  mapValuesToPrompt() {
    const form = this.formEditingService.getCurrentPrompt();

    if (!form) {
      return;
    }

    const { name, promptVariables, types } = form.definition;
    if (!promptVariables) {
      return;
    }

    const { company, context, objective } = promptVariables;

    const variablesString = types
      .map(
        (type: { label: string; type: string }) =>
          `{ ${type.label}: ${type.type} }`
      )
      .join(', ');

    this.defaultSystemPrompt =
      `Speak only in english.` +
      `ONLY respond with JSON, for example, { aKey: aValue }` +
      'Do NOT prefix with any markdown, like ```json or otherwise' +
      `Do not respond with Markdown or anything else, ONLY JSON.` +
      `You are the virtual assistant of the person ${name} who works for ${company}.` +
      `Your goal is to respond to the user in the same language they use, utilizing the 'message' variable.` +
      `Ask questions if necessary and capture as much user data as possible while assisting the user and in addition to their objective which is ${objective}` +
      `Keep in mind the context you've been given aswell which is ${context}` +
      `You must capture the user's data and add the variables to your JSON as you obtain their values.` +
      `Once you have finished, ask for confirmation to send the data to the user and if confirmed, add the 'Finish' variable with the value 'True'.` +
      `Always keep in mind the name of the variables and their specifications.` +
      `These are the variables you should request: ${variablesString}`;
  }

  async sendMessageToAI(message: string): Promise<string | null> {
    this.previousHistory.push({
      role: 'user',
      content: message,
    });
    this.mapValuesToPrompt();
    const openai = new OpenAI({
      apiKey: this.apiUrl,
      dangerouslyAllowBrowser: true,
    });

    console.log('this.previousHistory', this.previousHistory);
    const initialMessages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.defaultSystemPrompt,
      },
      {
        role: 'user',
        content: this.defaultUserPrompt,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: {
        type: 'json_object',
      },
      temperature: 0,
      messages: [
        ...initialMessages,
        { role: 'user', content: message },
        ...this.previousHistory,
      ],
    });

    console.log('response is', completion.choices[0]);

    return completion.choices[0].message.content;
  }
}
