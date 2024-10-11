import { Injectable } from '@angular/core';
import { FormEditingService } from '@app/services/form-editing.service';
import { environment } from 'environments/environment';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private formEditingService: FormEditingService) {}

  mapValuesToPrompt() {
    const currentForm = this.formEditingService.getCurrentPrompt();
    const { definition } = currentForm;
    const { name, promptVariables, fields } = definition;
    const { company, context, objective } = promptVariables[0];

    console.log('name is ', name);
    console.log(
      'name, promptVariables, fields is ',
      name,
      promptVariables,
      fields
    );
    console.log('company, context, objective is ', company, context, objective);
    console.log('fields are ', fields);
    const mappedPrompt = `Your response must always be valid JSON and must not include any other text. You are the virtual assistant of the person ${name} who works for
            ${company}. Your goal is to respond to the user in the same language they use, utilizing the 'message'
            variable. Ask questions if necessary and capture as much user data as possible while assisting the user and in addition to their objective of
           ${objective} and keeping in mind the context ${context}.
            You must capture the user's data and add the variables  to your JSON as you obtain
            their values. Once you have finished, ask for confirmation to send the data to the user and if confirmed, add the 'Finish'
            variable with the value 'True'. Always keep in mind the name of the variables and their specifications. These are the variables
            you should request: `;
    return mappedPrompt;
  }

  async sendMessageToAI(message: string) {
    const openai = new OpenAI({
      apiKey:
        'sk-IJ12Fq0Rjg-oF3sfS-jNp5GDakJGRjw_RD9b0zDPJIT3BlbkFJ3lLUMrGGrBuad4wYr6ohF0EHupGJXGaMMWHH_37dMA',
      dangerouslyAllowBrowser: true,
    });

    const mappedPrompt = this.mapValuesToPrompt();
    console.log('mappedPrompt', mappedPrompt);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: mappedPrompt,
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
