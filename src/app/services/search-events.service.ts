import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EventsService } from '../events/services/events.service';
import { Event } from '../events/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class SearchEventsService {

  private keywordSubject = new BehaviorSubject<string>('');
  keyword$ = this.keywordSubject.asObservable();

  constructor(
    private eventsService: EventsService
  ) { }

  // Permette di accedere all'Observable della parola chiave
  getKeywordObservable() {
    return this.keywordSubject.asObservable();
  }

  // Aggiorna la parola chiave
  setKeyword(keyword: string) {
    this.keywordSubject.next(keyword);
  }

  // Metodo per filtrare gli eventi in base alla keyword
  searchEvents(keyword: string): Observable<Event[]> {
    return this.eventsService.searchEvents(keyword);
  }
}
