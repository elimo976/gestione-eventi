import { Injectable } from '@angular/core';

interface User {
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User = { isAdmin: false };
  private isLoggedIn = false;

  constructor() { }


  // Funzione per verificare se l'utente è un amministratore
  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  // Funzione per login dell'utente
  userIsLoggedIn(): boolean {
    return this.isLoggedIn;
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
