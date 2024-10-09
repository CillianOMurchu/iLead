import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptConfigurationFormComponent } from './prompt-configuration-form.component';

describe('PromptConfigurationFormComponent', () => {
  let component: PromptConfigurationFormComponent;
  let fixture: ComponentFixture<PromptConfigurationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptConfigurationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
