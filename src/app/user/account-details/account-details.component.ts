import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';  // Aggiungi Router per la navigazione
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
  user: User | null = null;
  userId: string | null | undefined = undefined;
  errorMessage?: string;
  successMessage?: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    // Sottoscrivi il comportamento user$ per ottenere i dettagli dell'utente dal token
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.id; // Ottieni l'ID utente dal token
        console.log('User ID estratto dal token:', this.userId);
        this.loadUserDetails(); // Carica i dettagli dell'utente
      } else {
        console.error('Nessun utente loggato');
      }
    });
  }

  loadUserDetails(): void {
    if (this.userId) {
      // Recupera i dettagli dell'utente dal servizio
      this.userService.getUserDetails(this.userId).subscribe({
        next: (data) => {
          this.user = data; // Salva i dati dell'utente nella proprietà
          console.log('Dettagli utente caricati:', this.user);
        },
        error: (error) => {
          console.error('Errore nel recupero dei dettagli dell\'utente', error);
        }
      });
    } else {
      console.error('ID utente non trovato');
    }
  }
  deleteUser (): void {
    if (this.userId) {
      const confirmDeletion = window.confirm('Sei sicuro di voler eliminare il tuo account? Questa operazione è irreversibile.');

      if (confirmDeletion) {
        this.userService.deleteUser (this.userId).pipe(
          catchError((error) => {
            console.error('Errore durante l\'eliminazione:', error);
            return of(null);
          })
        ).subscribe((response) => {
          if (response) {
            console.log('Utente eliminato con successo:', response);

            // Logout e reindirizzamento con ritardo per visualizzare il Toast
            setTimeout(() => {
              this.authService.logout();
              this.router.navigateByUrl('/');
            }, 5000);
          } else {
          }
        });
      } else {
        console.log('Eliminazione annullata');
      }
    } else {
      console.error('ID utente non trovato');
    }
  }
}
