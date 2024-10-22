import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEventsService {

  private keywordSubject = new BehaviorSubject<string>('');
  keyword$ = this.keywordSubject.asObservable();

  constructor() { }

  // Permette di accedere all'Observable della parola chiave
  getKeywordObservable() {
    // console.log('Getting keyword observable');
    return this.keywordSubject.asObservable();
  }

  // Aggiorna la parola chiave
  setKeyword(keyword: string) {
    // console.log('Setting keyword', keyword);
    this.keywordSubject.next(keyword);
  }
}
