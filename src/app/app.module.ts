import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from './events/events.module';
import { UnderCostructionComponent } from './components/under-costruction/under-costruction.component';

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
    EventsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF, faXTwitter, faInstagram, faLinkedinIn, faChevronRight);
  }
}
