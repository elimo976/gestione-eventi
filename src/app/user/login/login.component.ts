import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl(false) // Inizialmente impostato su false (User)
    });
  }

  ngOnInit(): void {}

  toggleRole() {
    const currentRole = this.loginForm.get('role')!.value;
    this.loginForm.get('role')!.setValue(!this.loginForm.get('role')!.value);
    console.log('Role toggled to:', !currentRole);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, role } = this.loginForm.value;
      console.log('Login Info:', email, password, role);
      // Qui puoi chiamare il tuo servizio per eseguire il login
    }
  }
}
