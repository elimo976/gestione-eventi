import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { HeaderComponent } from './components/header/header.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { HeroComponent } from './components/hero/hero.component';
import { EventsPreviewComponent } from './components/events-preview/events-preview.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from './events/events.module';
import { UnderCostructionComponent } from './components/under-costruction/under-costruction.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaqComponent,
    HeaderComponent,
    CookieConsentComponent,
    HeroComponent,
    EventsPreviewComponent,
    FooterComponent,
    UnderCostructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    EventsModule,
    AuthModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF, faXTwitter, faInstagram, faLinkedinIn, faChevronRight);

    registerLocaleData(localeIt, 'it');
  }
}
