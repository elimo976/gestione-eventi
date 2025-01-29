import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, LoginUser } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  showPassword: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl(false), // Inizialmente impostato su false (User)
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit(): void {
    // Carica il token da localStorage se presente e lo imposta nel checkbox "Ricordami"
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.loginForm.get('rememberMe')?.setValue(true);
    }
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRole() {
    const currentRole = this.loginForm.get('role')!.value;
    this.loginForm.get('role')!.setValue(!currentRole);
    console.log('Role toggled to:', !currentRole);
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Inserisci un\'email e una password validi.';
      return;
    }

    const { email, password } = this.loginForm.value;

    const loginUser: LoginUser = { email, password };
    const rememberMe = this.loginForm.get('rememberMe')!.value;

    this.loading = true;
    this.errorMessage = null; // Resetta eventuali errori precedenti

    this.authService.login(loginUser, rememberMe).subscribe({
      next: (response) => {
        // Reindirizza alla pagina di benvenuto dopo un login riuscito
        this.router.navigateByUrl('/user/welcome');
      },
      error: (error) => {
        // Usa il messaggio personalizzato dal servizio
        this.errorMessage = error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false; // Ferma il caricamento alla fine della chiamata
      }
    });
  }


}
