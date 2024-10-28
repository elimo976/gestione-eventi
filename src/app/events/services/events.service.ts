// services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private apiUrl = `${environment.BASE_URL}/events`; // Usa l'URL dall'ambiente

    constructor(private http: HttpClient) {}

    createEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(this.apiUrl, event);
    }

    getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiUrl);
    }

    getEventById(eventId: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
    }

    searchEvents(keyword: string): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/search?keyword=${keyword}`);
    }

    populateDatabase(countryCode: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/populate?countryCode=${countryCode}`);
    }

    isLargeScreen(): boolean {
        return window.innerWidth > 900; 
      }
}