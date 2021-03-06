import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { genderValidator } from '../../../shared/directives/gender.directive';
import { GenderEnum } from 'src/app/shared/enum/gender.enum';

const EMAIL_PARTTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() user = new User();
  @Output() emitForm = new EventEmitter<User>();
  form: FormGroup;
  openModal = false;
  
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm(this.user);
  }

  get gender() {
    return GenderEnum;
  }

  validateForm() {
    if (this.form.valid) {
      // caminho feliz
    } else {
      this.markFormGroupTouched(this.form);
      this.emitForm.emit(null);
    }
  }
  resetForm(){
    this.createForm(this.user);
  }

  private createForm(user: User) {
    this.form = this._fb.group({
      'name': [user.name, [
        Validators.required,
        Validators.minLength(3)]
      ],
      'email': [user.email, [
        Validators.required,
        Validators.pattern(EMAIL_PARTTERN)]
      ],
      'gender': [user.gender, [
        Validators.required,
        genderValidator]
      ],
      'status': [user.status]
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
}
