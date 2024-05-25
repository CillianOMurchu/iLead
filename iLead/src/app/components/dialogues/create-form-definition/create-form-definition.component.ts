import { Component } from '@angular/core';

@Component({
  selector: 'app-create-form-definition',
  templateUrl: './create-form-definition.component.html',
  styleUrls: ['./create-form-definition.component.scss'],
})
export class CreateFormDefinitionComponent {
  isEditing = false;

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }
}
