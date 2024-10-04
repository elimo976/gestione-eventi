import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent {

  displayBanner = true;
  showCookieInfo = false;

  ngOnInit() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      this.displayBanner = false; // Non mostrare il banner se l'utente ha già fatto una scelta
    }
  }
  acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.displayBanner = false; // Nascondi il banner
    console.log('Cookies accettati');
  }
  
  rejectCookies() {
    this.displayBanner = false; // Nascondi il banner
    console.log('Cookies rifiutati');
  }
  
  customizeCookies() {
    console.log('Cookie personalizzati');
  }

  toggleCookieInfo() {
    this.showCookieInfo = !this.showCookieInfo;
  }
  
}
