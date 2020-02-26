import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrCheckboxModule, ClrIconModule, ClrInputModule, ClrModalModule, ClrRadioModule } from '@clr/angular';
import { GenderEnum } from 'src/app/shared/enum/gender.enum';
import { User } from 'src/app/shared/models/user';
import { FormComponent } from './form.component';


const CLARITY_MODULES = [
  ClrRadioModule,
  ClrIconModule,
  ClrInputModule,
  ClrCheckboxModule,
  ClrModalModule // modulo de modal do framework
]

const FORM_GROUP = [
  ReactiveFormsModule,
  FormsModule
]

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let user: User = {
    name: 'Any Name',
    email: 'any_email@email.com',
    gender: GenderEnum.FEMININE,
    status: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        CLARITY_MODULES,
        FORM_GROUP,
        BrowserAnimationsModule // foi adicionado pois existe dependencias do framework
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
    expect(component.form.controls['name']).toBeTruthy();
    expect(component.form.controls['email']).toBeTruthy();
    expect(component.form.controls['gender']).toBeTruthy();
    expect(component.form.controls['status']).toBeTruthy();
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
    component.ngOnInit();
    component.validateForm();
    expect(component.emitForm.emit).toHaveBeenCalled();
  });

  it('should get GenderEnum', () => {
    expect(component.gender.FEMININE).toEqual(GenderEnum.FEMININE);
    expect(component.gender.MALE).toEqual(GenderEnum.MALE);
  });

  it('should no fields must contain a "clr-error" class', () => {
    let errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);
  });

  it('after the field name is touched, it must contain the error class "clr-error"', () => {
    let inputEl: HTMLInputElement = fixture.nativeElement.querySelector('#input-name');
    let errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);

    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(1);
  });

  it('after the field email is touched, it must contain the error class "clr-error"', () => {
    let inputEl: HTMLInputElement = fixture.nativeElement.querySelector('#input-email');
    let errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);

    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(1);
  });

  it('should validate the input data in the name field and add the error class "clr-error"', () => {
    let inputEl: HTMLInputElement = fixture.debugElement.query(By.css('#input-name')).nativeElement;
    let errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);

    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(1);

    inputEl.value = 'Everton Roberto';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);
  });

  // implement email test and detail explanation

  it('should click on the save button and the name field is empty, apply the class "clr-error"', () => {
    let errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);

    let email: HTMLInputElement = fixture.debugElement.query(By.css('input[name=email]')).nativeElement;
    let gender: HTMLInputElement = fixture.debugElement.query(By.css('input[type=radio]')).nativeElement;
    let status: HTMLInputElement = fixture.debugElement.query(By.css('input[name=status]')).nativeElement;
    let btn: HTMLButtonElement = fixture.debugElement.query(By.css('#btn-submit')).nativeElement;

    email.value = 'any_email@email.com';
    email.dispatchEvent(new Event('input'));

    gender.value = GenderEnum.FEMININE;
    gender.dispatchEvent(new Event('input'));

    status.checked;
    status.dispatchEvent(new Event('input'));

    btn.click();
    fixture.detectChanges();

    errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(1);

    let name: HTMLInputElement = fixture.debugElement.query(By.css('input[name=name]')).nativeElement;
    name.value = "Any Name";
    name.dispatchEvent(new Event('input'));
    btn.click();
    fixture.detectChanges();

    errors = fixture.debugElement.queryAll(By.css('.clr-error'));
    expect(errors.length).toEqual(0);
  });

  // implement email test and detail explanation


  // NOVOS TESTES
  it('when clicking on the "cancel" button, you should open the modal', () => {

    component.user = user;
    component.ngOnInit();

    let modalEl = fixture.debugElement.query(By.css('.modal-dialog'));
    expect(modalEl).toBeNull();

    fixture.debugElement.query(By.css('#btn-cancel')).nativeElement.click();
    fixture.detectChanges();

    modalEl = fixture.debugElement.query(By.css('.modal-dialog')).nativeElement;
    expect(modalEl).not.toBeNull();
  });

  it('should clicking the "no" button to cancel registration, close modal and not clear the form', () => {
    component.user = new User();
    component.ngOnInit();
    fixture.autoDetectChanges();

    let nameEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name=name')).nativeElement;
    nameEl.value = user.name;
    nameEl.dispatchEvent(new Event('input'));
    expect(nameEl.value).toEqual(user.name);
    
    fixture.debugElement.query(By.css('#btn-cancel')).nativeElement.click();
    fixture.debugElement.query(By.css('#btn-modal-reset-form-no')).nativeElement.click();

    let modalEl = fixture.debugElement.query(By.css('.modal-dialog'));
    expect(modalEl).toBeNull();

    nameEl = fixture.debugElement.query(By.css('input[name=name')).nativeElement;
    expect(nameEl.value).toEqual(user.name);

  });

  it('should clicking the "yes" button to cancel registration, close modal and clear the form', () => {
    component.user = new User();
    component.ngOnInit();
    fixture.autoDetectChanges();

    let nameEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name=name')).nativeElement;
    nameEl.value = user.name;
    nameEl.dispatchEvent(new Event('input'));
    expect(nameEl.value).toEqual(user.name);

    fixture.debugElement.query(By.css('#btn-cancel')).nativeElement.click();
    fixture.debugElement.query(By.css('#btn-modal-reset-form-yes')).nativeElement.click();

    let modalEl = fixture.debugElement.query(By.css('.modal-dialog'));
    expect(modalEl).toBeNull();

    nameEl = fixture.debugElement.query(By.css('input[name=name')).nativeElement;
    expect(nameEl.value).toEqual('');
  });
});
