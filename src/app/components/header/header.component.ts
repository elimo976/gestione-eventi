import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchEventsService } from '../../services/search-events.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  keyword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private searchEventsService: SearchEventsService,
    private fb: FormBuilder
  ) { }

  keywordControl = new FormControl('');

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
}
