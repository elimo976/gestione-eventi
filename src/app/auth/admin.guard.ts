import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica se l'utente è un amministratore
    if (this.authService.isAdmin()) {
      return true;
    } else {
      // Se non è un amministratore, naviga alla pagina principale
      this.router.navigate(['/']);
      return false;
    }
  }
}
