import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDefinitionComponent } from './edit-form-definition.component';

describe('EditFormDefinitionComponent', () => {
  let component: EditFormDefinitionComponent;
  let fixture: ComponentFixture<EditFormDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFormDefinitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
