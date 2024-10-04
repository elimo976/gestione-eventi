import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToUser() {
    if(this.authService.userIsLoggedIn()) {
      this.router.navigateByUrl('/user/login');
    } else {
      this.router.navigateByUrl('/user/register');
    }
  }
}
