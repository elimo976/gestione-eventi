import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { SearchEventsService } from '../../services/search-events.service';
import { Event } from '../models/event.model';
import { EventsService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  keyword: string = '';
  events$: Subject<string> = new Subject<string>();
  events: Event[] = [];

  constructor(
    private eventsService: EventsService,
    private searchEventsService: SearchEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchEventsService.getKeywordObservable()
      .pipe(
        debounceTime(300),
        switchMap(keyword => {
          this.populateDatabase(keyword);
          return this.eventsService.searchEvents(keyword);
        })
      )
      .subscribe({
        next: (events) => {
          this.events = events;
        },
        error: (error) => {
          console.error('Errore durante la ricerca degli eventi:', error);
        }
      });
  }

  isVenueAvailable(event: Event): boolean {
    return !!event.venues && event.venues.length > 0;
  }

  private populateDatabase(keyword: string): void {
    const countryCodes = this.extractCountryCodes(keyword);
    console.log('Country Codes:', countryCodes);

    if (countryCodes.length > 0) {
      const queryString = countryCodes.join(',');
      this.eventsService.populateDatabase(queryString).subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (error) => {
          console.error('Errore durante il popolamento del database:', error);
        }
      });
    } else {
      console.log('Nessun codice paese trovato per la keyword:', keyword);
    }
  }

  private extractCountryCodes(keyword: string): string[] {
    const countryMapping: { [key: string]: string } = {
      'parigi': 'FR',
      'londra': 'GB',
      'berlino': 'DE',
      'madrid': 'ES',
      'roma': 'IT',
      'amsterdam': 'NL',
      'vienna': 'AT',
      'bruxelles': 'BE',
      'budapest': 'HU',
      'lisbona': 'PT',
      'praga': 'CZ',
      'varsavia': 'PL',
      'copenhagen': 'DK',
      'oslo': 'NO',
      'helsinki': 'FI',
      'edimburgo': 'GB',
      'zurigo': 'CH',
      'belgrado': 'RS',
    };

    const keywordsArray = keyword.toLowerCase().split(','); // Assumendo che le città siano separate da virgole
    return keywordsArray.map(city => countryMapping[city.trim()]).filter(code => code); // Filtra i codici validi
  }

  goToEventDetail(eventId: string) {
    this.router.navigateByUrl(`/event-detail/${eventId}`);
    console.log("Hai cliccato su:",eventId)
  }
  
  isLargeScreen(): boolean {
    return window.innerWidth > 900; 
  }
}
