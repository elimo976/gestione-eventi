import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { passwordMatchValidator } from './validators/password-match.validator';
import { passwordStrengthValidator } from './validators/password-validator';

@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
  ], // Esporta i validatori se necessario
  providers: [
    { provide: 'passwordMatchValidator', useValue: passwordMatchValidator },
    { provide: 'passwordStrengthValidator', useValue: passwordStrengthValidator }
  ]
})
export class SharedModule { }
