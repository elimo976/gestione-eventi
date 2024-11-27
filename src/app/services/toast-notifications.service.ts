import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationsService {

  private toastSubject = new BehaviorSubject<{ message: string, type: 'success' | 'error' | 'info' | 'warning'}>({ message: '', type: 'info'});
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, type:  'success' | 'error' | 'info' | 'warning' = 'info') {
    this.toastSubject.next({ message, type });
  }
}
