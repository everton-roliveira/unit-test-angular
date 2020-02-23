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

// imports do reactive forms
const FORM_GROUP = [
  ReactiveFormsModule,
  FormsModule
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
        FORM_GROUP
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

  it('should create formGroup', () => {
    expect(component.form).toBeTruthy();
  });

  fit('should create formGroup with all fields', () => {
    class User {
      name: string;
      email: string;
      gender: 'FEMININE' | 'MALE';
      status: boolean;
    }

    let user = new User();
    user = {
      name: '',
      email: '',
      gender: 'FEMININE',
      status: true
    };
    expect(component.form.value).toEqual(user);
  });
});
