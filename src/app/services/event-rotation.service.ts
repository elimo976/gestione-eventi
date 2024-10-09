import { Injectable } from '@angular/core';
import { interval, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRotationService {
  private currentActiveIndex: number = 0;
  private eventsCount: number = 4; // Numero totale di anteprime
  private activeIndexSubject = new Subject<number>();

  // Observable che emette l'indice dell'anteprima attiva
  activeIndex$ = this.activeIndexSubject.asObservable();

  // Funzione per cambiare l'anteprima attiva
  constructor() {
    interval(4000).pipe(
      map(() => {
        this.currentActiveIndex = (this.currentActiveIndex + 1) % this.eventsCount;
        return this.currentActiveIndex;
      })
    ).subscribe(index => this.activeIndexSubject.next(index));
   }
}
