import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prompt-configuration',
  templateUrl: './prompt-configuration.component.html',
  styleUrl: './prompt-configuration.component.scss',
})
export class PromptConfigurationComponent {
  @Input() config: any;

  ngOnInit() {
    console.log('config is ', this.config);
  }
}
