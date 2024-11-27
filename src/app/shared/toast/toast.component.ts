import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastNotificationsService } from '../../services/toast-notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() duration: number = 5000;
  show: boolean = false; // Stato per mostrare/nascondere il toast

  private toastSubscription: Subscription | null = null;

  constructor(
    private toastNotificationServices: ToastNotificationsService
  ) { }

  ngOnInit() {
    this.toastSubscription = this.toastNotificationServices.toast$.subscribe(({ message, type}) => {
      if (message) {
        this.showToast(message, type);
      }
    })
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  showToast(message: string,  type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    this.message = message;
    this.type = type;
    this.show = true;

    setTimeout(() => {
      this.close();
    }, 5000); // Nascondi dopo 5 secondi
  }

  close() {
    this.show = false;
  }

  getToastClass(): string {
    switch (this.type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return ''; // Se non è definito un tipo, non applica nessuna classe
    }
  }

}
