import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { FormComponent } from './components/form/form.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';
@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
