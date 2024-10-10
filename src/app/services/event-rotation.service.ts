import { Injectable } from '@angular/core';
import { interval, map, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRotationService {
  private currentActiveIndex: number = 0;
  private eventsCount: number = 4; // Numero totale di anteprime
  private activeIndexSubject = new Subject<number>();
  private intervalSubscription?: Subscription;
  private isPaused: boolean = false;
  private pauseStartTime: number = 0; // Per gestire il tempo in pausa
  private timeSinceLastRotation: number = 0; // Tempo accumulato dalla rotazione precedente

  // Observable che emette l'indice dell'anteprima attiva
  activeIndex$ = this.activeIndexSubject.asObservable();

  constructor() {
    this.startRotation();
  }

  // Funzione per avviare la rotazione
  private startRotation() {
    this.intervalSubscription = interval(4000).pipe(
      map(() => {
        if (!this.isPaused) {  // Verifica se non è in pausa
          this.timeSinceLastRotation = 0; // Resetta il tempo accumulato
          this.currentActiveIndex = (this.currentActiveIndex + 1) % this.eventsCount;
        }
        return this.currentActiveIndex;
      })
    ).subscribe(index => this.activeIndexSubject.next(index));
  }

  // Funzione per fermare la rotazione (durante hover)
  pauseRotation() {
    this.isPaused = true;
    this.pauseStartTime = Date.now(); // Memorizza il momento in cui è stata messa in pausa
  }

  // Funzione per riprendere la rotazione (quando esce dall'hover)
  resumeRotation() {
    if (this.isPaused) {
      this.isPaused = false;
      const pauseDuration = Date.now() - this.pauseStartTime;  // Calcola la durata della pausa

      // Se la pausa ha superato l'intervallo, forza il cambio immagine
      if (pauseDuration >= 4000) {
        this.currentActiveIndex = (this.currentActiveIndex + 1) % this.eventsCount;
        this.activeIndexSubject.next(this.currentActiveIndex);
      }
    }
  }

  // Funzione per gestire il cambio di visibilità della pagina
  private setupVisibilityChangeHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.pauseRotation();
      } else if (document.visibilityState === 'visible') {
        this.resetRotation();
      }
    })
  }

  private resetRotation() {
    this.currentActiveIndex = 0; // Resetta l'indice attivo
    this.startRotation(); // Riavvia il ciclo di rotazione dall'inizio
    this.activeIndexSubject.next(this.currentActiveIndex); // Aggiorna l'indice attivo
  }
}
