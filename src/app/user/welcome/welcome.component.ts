import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUser, RegisterUser } from '../../services/auth.service'; // Importa i tipi corretti

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  userName: string = '';
  isLoggedIn: boolean = false;
  private userSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Sottoscriviti all'observable user$ per ottenere i dati utente in tempo reale
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        // Verifica se l'utente è un 'RegisterUser' (contiene firstName e lastName)
        if ('firstName' in user && 'lastName' in user) {
          // Se l'utente è un RegisterUser
          this.userName = `${user.firstName} ${user.lastName}`;
        } else if ('email' in user) {
          // Se l'utente è un LoginUser (contiene solo email)
          this.userName = user.email;
        }
        this.isLoggedIn = true;
      } else {
        this.userName = 'Utente sconosciuto';
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/user/login');
  }

  ngOnDestroy(): void {
    // Annulla la sottoscrizione per evitare memory leaks
    this.userSubscription?.unsubscribe();
  }
}
