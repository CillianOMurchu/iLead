import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPromptComponent } from './default-prompt.component';

describe('DefaultPromptComponent', () => {
  let component: DefaultPromptComponent;
  let fixture: ComponentFixture<DefaultPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultPromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
