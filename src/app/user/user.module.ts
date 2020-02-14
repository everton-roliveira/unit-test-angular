import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';
import { ClarityModule } from '@clr/angular';
import { ComponentsComponent } from './components/components.component';
import { FormComponent } from './components/form/form.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
@NgModule({
  declarations: [ListComponent, ComponentsComponent, FormComponent, EditComponent, CreateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ClarityModule
  ]
})
export class UserModule { }
