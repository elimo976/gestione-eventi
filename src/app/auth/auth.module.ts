import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ AuthGuard, AdminGuard, AuthService ]
})
export class AuthModule { }
