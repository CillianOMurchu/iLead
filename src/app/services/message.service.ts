import { Injectable } from '@angular/core';
import { FormEditingService } from '@app/services/form-editing.service';
import { environment } from 'environments/environment';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'API_KEY_HERE';

  mappedPrompt = '';

  constructor(private formEditingService: FormEditingService) {
    this.mapValuesToPrompt();
  }

  mapValuesToPrompt() {
    const form = this.formEditingService.getCurrentPrompt();
    console.log('form is ', form);

    if (!form) {
      return;
    }

    const { name, promptVariables, types } = form.definition;
    if (!promptVariables) {
      return;
    }

    const { company, context, objective } = promptVariables;
    console.log('name is ', name);
    console.log('promptVariables are ', promptVariables);
    console.log('types are ', types);

    const variablesString = types
      .map(
        (type: { label: string; type: string }) =>
          `{ ${type.label}: ${type.type} }`
      )
      .join(', ');

    this.mappedPrompt = `Your response must always be valid JSON and must not include any other text. You are the virtual assistant of the person
    ${name}
    who works for
    ${company}
    Your goal is to respond to the user in the same language they use, utilizing the 'message' variable.
    Ask questions if necessary and capture as much user data as possible while assisting the user and in addition to their objective of
    ${objective}
    and keeping in mind the context
    ${context}
    You must capture the user's data and add the variables to your JSON as you obtain their values.
    Once you have finished, ask for confirmation to send the data to the user and if confirmed, add the 'Finish' variable with the value 'True'.
    Always keep in mind the name of the variables and their specifications.
    These are the variables you should request: ${variablesString}`;
  }

  async sendMessageToAI(message: string) {
    this.mapValuesToPrompt();
    const openai = new OpenAI({
      apiKey: this.apiUrl,
      dangerouslyAllowBrowser: true,
    });

    console.log('mappedPrompt', this.mappedPrompt);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: this.mappedPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    console.log('completion', completion);
    return completion.choices[0].message;
  }
}
