import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-configuration',
  templateUrl: './prompt-configuration.component.html',
  styleUrl: './prompt-configuration.component.scss',
})
export class PromptConfigurationComponent {
  @Input() config: any;

  @Output() toggleDrawer = new EventEmitter<void>();

  ngOnInit() {
    console.log('config is ', this.config);
  }
}
