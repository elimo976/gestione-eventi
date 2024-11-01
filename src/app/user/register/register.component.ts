import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';
import { passwordStrengthValidator } from '../../shared/validators/password-validator';
import { requiredTrueValidator } from '../../shared/validators/checkbox.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterUserDto } from '../dto/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  toastMessage: string ='';
  showToast: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl(false),
      termsAccepted: new FormControl(false, requiredTrueValidator()) 
    }, { validators: passwordMatchValidator() }); // Passa la funzione del validatore
  }

  toggleRole() {
    const currentRole = this.registerForm.get('role')!.value;
    this.registerForm.get('role')!.setValue(!currentRole);
    console.log('Role toggled to:', !currentRole);
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    this.registerForm.get('termsAccepted')?.markAsTouched();
    if (this.registerForm.valid) {
      const { confirmPassword, termsAccepted, ...formData } = this.registerForm.value;
      const user: RegisterUserDto = { ...formData, isAdmin: this.registerForm.value.role };
  
      this.authService.register(user).subscribe({
        next: () => {
          if (this.registerForm.value.role) {
            this.toastMessage = 'La registrazione deve essere approvata da un admin già registrato.';
          } else {
            this.toastMessage = 'Registrazione avvenuta con successo!';
            this.router.navigate(['/user/login']);
          }
          this.showToast = true;
          this.registerForm.reset(); // Reset della form
        },
        error: (error) => {
          console.error('Errore durante la registrazione', error);
          this.toastMessage = 'Si è verificato un errore durante la registrazione. Riprova.';
          this.showToast = true;
        }
      });
    } else {
      console.error('Form non valido', this.registerForm.errors);('requiredTrue');
      console.log('touched', this.registerForm.get('termsAccepted')?.touched);
      this.toastMessage = 'Ci sono errori nel modulo. Controlla di aver compilato tutti i campi.';
      this.showToast = true;
    }
  }
  
}

