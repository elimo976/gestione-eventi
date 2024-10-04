import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

export const adminGuard: CanActivateFn = (route, state) => {
  // La mia Guard non essendo una classe, bensì una funzione, non mi permette di iniettare le dipendenze tramite costruttore, quindi uso 'inject' per ovviare al problema.
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se l'utente è un amministratore
  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
