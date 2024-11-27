import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchEventsService } from '../../services/search-events.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  keyword: string = '';
  isLoggedIn: boolean = false;
  userName: string = '';
  private userSubscription: Subscription | null = null;
  userId: string | null = null;
  userIcon: boolean = false; // Proprietà per gestire l'icona dell'account

  constructor(
    private router: Router,
    private authService: AuthService,
    private searchEventsService: SearchEventsService,
  ) { }

  keywordControl = new FormControl('');

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.userName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
        this.isLoggedIn = true;
        this.userIcon = false;
      } else {
        this.userName = '';
        this.isLoggedIn = false;
        this.userIcon = true;
      }
    })

    // Sottoscrizione a user$ per ottenere l'ID utente
    this.authService.user$.subscribe(user => {
      if (user && user.id) {
        this.userId = user.id; // Assegna l'ID se è presente
      }
    })
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToUser() {
          this.router.navigateByUrl('/user/login');
  }

  onKeywordChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    // console.log('Keyword changed:', input.value);
    this.searchEventsService.setKeyword(input.value);

    // Reindirizza alla home se la chiave di ricerca è inserita
    if(input.value.length > 0) {
      this.router.navigateByUrl('/');
    }
  }

  clearInput() {
    this.keywordControl.setValue('');
    this.searchEventsService.setKeyword('');
  }

  onUserNameClick(): void {
    if (this.userId) {
      this.router.navigateByUrl(`/user/account-details/${this.userId}`);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/user/login');
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
