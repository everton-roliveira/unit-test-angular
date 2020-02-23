import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  user: User = new User();
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm(this.user);
  }

  createForm(user: User) {
    this.form = this._fb.group({
      'name': [user.name, [
        Validators.required]
      ],
      'email': [user.email],
      'gender': [user.gender],
      'status': [user.status]
    });
  }

}
