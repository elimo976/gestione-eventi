import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from '../shared/validators/validators.module';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountEditComponent } from './account-edit/account-edit.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AccountDetailsComponent,
    AccountEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ValidatorsModule,
    SharedModule,
    FontAwesomeModule,
  ]
})
export class UserModule { }
