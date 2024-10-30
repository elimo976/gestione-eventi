import { Component, OnInit } from '@angular/core';
import { SearchEventsService } from '../../services/search-events.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
  })
  export class HomeComponent {
    keyword = '';
    isLoading = true;
    hasResults = false; 
  
    constructor(private searchEventsService: SearchEventsService) {}
  
    ngOnInit() {
      // Sottoscrizione alla parola chiave
      this.searchEventsService.keyword$.subscribe(keyword => {
        this.keyword = keyword;
        this.updateResults();
      });
    }
  
    updateResults() {
      // Imposta isLoading a true per mostrare lo spinner
      this.isLoading = true;
  
      // Chiama il servizio di ricerca
      this.searchEventsService.searchEvents(this.keyword).subscribe(results => {
        this.hasResults = results.length > 0;
        
        // Imposta isLoading a false una volta terminato il caricamento
        this.isLoading = false;
      });
    }
  }
