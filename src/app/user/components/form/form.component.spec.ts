import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ClrRadioModule, ClrIconModule, ClrInputModule, ClrCheckboxModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { GenderEnum } from 'src/app/shared/enum/gender.enum';

const CLARITY_MODULES = [
  ClrRadioModule,
  ClrIconModule,
  ClrInputModule,
  ClrCheckboxModule
]

const FORM_GROUP = [
  ReactiveFormsModule,
  FormsModule
]

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
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

  it('should create formGroup with all fields', () => {
    let user = new User();
    user = {
      name: null,
      email: null,
      gender: GenderEnum.FEMININE,
      status: true
    };
    expect(component.form.value).toEqual(user);
  });

  it('should form invalid when empty', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('should validate name field', () => {
    let name = component.form.controls['name'];
    expect(name.valid).toBeFalsy();

    let errors = name.errors || {};
    expect(errors['required']).toBeTruthy();

    name.setValue('ER');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    name.setValue('Name teste');
    errors = name.errors || {};
    expect(errors['minlength']).toBeFalsy();
    expect(name.valid).toBeTruthy();
  });

  it('should validate email field', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy()

    email.setValue('email_invalid');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    email.setValue('email@email.com');
    errors = email.errors || {};
    expect(errors['pattern']).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });

  it('should validate gender field', () => {
    let gender = component.form.controls['gender'];
    gender.setValue(null);
    let errors = gender.errors || {};
    expect(errors['required']).toBeTruthy();

    gender.setValue('any_value');
    errors = gender.errors || {};
    expect(errors['gender']).toBeTruthy();

    gender.setValue(GenderEnum.FEMININE);
    errors = gender.errors || {};
    expect(errors['gender']).toBeFalsy();
    expect(gender.valid).toBeTruthy();
  });

  it('should create the form with the value passed by input', () => {
    let user = new User();
    user = {
      name: 'Name test',
      email: 'any_email@email.com',
      gender: GenderEnum.FEMININE,
      status: true
    }
    component.user = user;
    component.ngOnInit();
    expect(component.form.value).toEqual(user);
    expect(component.form.valid).toBeTruthy();

    user.email = 'invalid_email';
    component.user = user;
    component.ngOnInit();
    expect(component.form.invalid).toBeTruthy();
  });

  it('emitForm must issue when validateForm () is called', () => {
    spyOn(component.emitForm, 'emit');
    component.user = {
      name: 'Teste name',
      email: 'any_email@email.com',
      gender: GenderEnum.FEMININE,
      status: true
    };
    component.ngOnInit();
    component.validateForm();
    expect(component.emitForm.emit).toHaveBeenCalled();
  });

  // NOVO TESTE
  it('should get GenderEnum', () => {
    expect(component.gender.FEMININE).toEqual(GenderEnum.FEMININE);
    expect(component.gender.MALE).toEqual(GenderEnum.MALE);
  });
});
