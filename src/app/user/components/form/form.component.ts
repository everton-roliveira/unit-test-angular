import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { genderValidator } from '../../../shared/directives/gender.directive';

const EMAIL_PARTTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Agora user é uma propriedade de entrada (decorator @Input)
  @Input() user: User = new User();
  form: FormGroup;
  
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm(this.user);
  }

  // refatorando o método
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

}
