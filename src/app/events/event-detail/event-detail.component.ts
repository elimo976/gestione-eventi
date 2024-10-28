import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  eventId: string | null = null;
  eventDetail: Event | null = null;

  constructor(
    private route: ActivatedRoute,
    public eventsService: EventsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      if (this.eventId) {
        this.loadEventDetail(this.eventId);
      }
    })
  }

  loadEventDetail(eventId: string) {
    this.eventsService.getEventById(eventId).subscribe({
      next: (event) => {
        this.eventDetail = event;
        console.log('Dettagli Evento:', this.eventDetail);
      },
      error: (err) => console.error('Errore nel caricamento dell\'evento:', err)
    });
  }
}
