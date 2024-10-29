import { Component, OnInit } from '@angular/core';
import { SearchEventsService } from '../../services/search-events.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
  })
  export class HomeComponent implements OnInit {
    keyword = '';
    hasResults = true;  // Valore predefinito per la visualizzazione
  
    constructor(private searchEventsService: SearchEventsService) {}
  
    ngOnInit() {
      // Sottoscrizione alla parola chiave
      this.searchEventsService.keyword$.subscribe(keyword => {
        this.keyword = keyword;
        this.updateResults();
      });
    }
  
    updateResults() {
      // Utilizza il servizio di ricerca e aggiorna `hasResults` in base alla risposta
      this.searchEventsService.searchEvents(this.keyword).subscribe(results => {
        this.hasResults = results.length > 0;
      });
    }
  }
