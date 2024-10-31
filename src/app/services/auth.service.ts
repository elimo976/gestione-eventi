import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RegisterUserDto } from '../user/dto/user.dto';

interface User {
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrlAuth = `${environment.BASE_URL}/auth`;

  private user: User = { isAdmin: false };
  private isLoggedIn = false;

  constructor(private http: HttpClient) { }


  // Funzione per verificare se l'utente è un amministratore
  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  // Funzione per sapere sel'utente è loggato
  userIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Funzione per eseguire la registrazione dell'utente
  register(user: RegisterUserDto) {
    return this.http.post<User>(`${this.apiUrlAuth}/register`, user);
  }

  // Funzione per eseguire il login dell'utente
  login(isAdmin: boolean) {
    this.isLoggedIn = true;
    this.user.isAdmin = isAdmin;
  }

  // Funzione per eseguire il logout dell'utente
  logout() {
    this.isLoggedIn = false;
    this.user.isAdmin = false;
  }
}
