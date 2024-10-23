import { Component } from '@angular/core';
import { SearchEventsService } from '../../services/search-events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  keyword: string = '';

  constructor(private searchEventsService: SearchEventsService) {}

  ngOnInit(): void {
    // Sottoscrizione ai cambiamenti della parola chiave
    this.searchEventsService.keyword$.subscribe(keyword => {
      // console.log('Keyword changed:', keyword);
      this.keyword = keyword;
    })
  }
}
