import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ClrRadioModule, ClrIconModule, ClrInputModule, ClrCheckboxModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// imports do framework clarity
const CLARITY_MODULES = [
  ClrRadioModule,
  ClrIconModule,
  ClrInputModule,
  ClrCheckboxModule
]

// fdescribe -> usado para fixar o run de teste em um unico describe
fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        // adicionado o array de imports do framework
        CLARITY_MODULES,
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should create formGroup', () => {
    expect(component.form).toBeTruthy();
  });
});
