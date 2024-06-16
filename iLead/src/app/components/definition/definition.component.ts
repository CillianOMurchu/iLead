import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrl: './definition.component.scss'
})
export class DefinitionComponent {
  @Input() formDefinition: any;

  constructor(){
    console.log('formDefinition is ', this.formDefinition);
  }
}
