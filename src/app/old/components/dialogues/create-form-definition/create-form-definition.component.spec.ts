import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormDefinitionComponent } from '@components/dialogues/create-form-definition/create-form-definition.component';

describe('CreateFormDefinitionComponent', () => {
  let component: CreateFormDefinitionComponent;
  let fixture: ComponentFixture<CreateFormDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFormDefinitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFormDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
