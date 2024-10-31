import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-_])[A-Za-z\d@$!%*?&.-_]{8,}$/; // Almeno 8 caratteri: una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale

    const valid = passwordPattern.test(password);
    return valid ? null : { passwordStrength: true };
  };
}
