import { Component, OnInit } from '@angular/core';
import { debounceTime, of, Subject, switchMap, Observable } from 'rxjs'; // Aggiunto Observable
import { SearchEventsService } from '../../services/search-events.service';
import { Event } from '../models/event.model';
import { EventsService } from '../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  keyword: string = '';
  events$: Subject<string> = new Subject<string>();
  events: Event[] = [];

  constructor(
    public eventsService: EventsService,
    private searchEventsService: SearchEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inizializza l'osservabile per ricevere le keyword
    this.events$.pipe(
      debounceTime(300), // Attende 300 ms prima di inviare la richiesta
      switchMap(keyword => this.searchEvents(keyword)) // Richiama il backend solo per gli eventi che corrispondono alla keyword
    ).subscribe({
      next: (events: Event[]) => {
        this.events = events; // Imposta gli eventi restituiti dal backend
      },
      error: (error) => {
        console.error('Errore durante la ricerca degli eventi:', error);
      }
    });

    // Se vuoi attivare la ricerca in base all'input, ascolta i cambiamenti
    this.searchEventsService.getKeywordObservable().subscribe(keyword => {
      this.events$.next(keyword); // Passa la keyword all'osservabile
    });
  }

  // Filtra gli eventi in base alla keyword
  private searchEvents(keyword: string): Observable<Event[]> {
    console.log('Keyword da cercare:', keyword); // Debug
    if (!keyword || keyword.trim() === '') {
      return of([]); // Restituisce un array vuoto se la keyword è vuota
    }

    return this.eventsService.searchEvents(keyword);
  }

  isVenueAvailable(event: Event): boolean {
    return !!event.venues && event.venues.length > 0;
  }

  goToEventDetail(eventId: string) {
    this.router.navigateByUrl(`/events/event-detail/${eventId}`);
    console.log("Hai cliccato su:", eventId);
  }
}
