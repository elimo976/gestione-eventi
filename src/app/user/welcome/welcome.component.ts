import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  userName: string = '';
  userId: string | null = null; // ID dell'utente
  isLoggedIn: boolean = false;
  private userSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        // Controlla che i valori siano definiti
        this.userName = (user.firstName && user.lastName)
          ? `${user.firstName} ${user.lastName}`
          : (user.email || 'Utente sconosciuto');

        this.userId = user.id || null; // Assicurati che userId sia valido
        this.isLoggedIn = true;
      } else {
        this.userName = 'Utente sconosciuto';
        this.userId = null;
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
    this.userSubscription?.unsubscribe();
  }
}
