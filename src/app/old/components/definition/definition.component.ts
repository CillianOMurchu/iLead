import { Component, EventEmitter, Input, Output } from '@angular/core';
// import type { FormDefinition } from '@app/models/form-definition.model';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrl: './definition.component.scss',
})
export class DefinitionComponent {
  @Input() formDefinition: any;
  // @Output() edit = new EventEmitter<FormDefinition>();

  constructor() {}

}
