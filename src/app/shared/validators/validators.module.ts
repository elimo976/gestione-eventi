// src/app/shared/validators/validators.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from './password-match.validator'; // Modifica il percorso in base alla tua struttura
import { passwordStrengthValidator } from './password-validator'; // Modifica il percorso in base alla tua struttura

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'passwordMatchValidator', useValue: passwordMatchValidator },
    { provide: 'passwordStrengthValidator', useValue: passwordStrengthValidator }
  ],
  exports: []
})
export class ValidatorsModule { }
