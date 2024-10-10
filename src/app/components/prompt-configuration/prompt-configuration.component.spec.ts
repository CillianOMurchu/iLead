import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptConfigurationComponent } from './prompt-configuration.component';

describe('PromptConfigurationComponent', () => {
  let component: PromptConfigurationComponent;
  let fixture: ComponentFixture<PromptConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
