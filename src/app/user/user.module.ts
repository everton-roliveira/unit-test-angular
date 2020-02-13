import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';
import { ClarityModule } from '@clr/angular';
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ClarityModule
  ]
})
export class UserModule { }
