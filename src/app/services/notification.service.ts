import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-center', // Posizione in alto al centro
      timeOut: 3000, // Durata della visualizzazione
      progressBar: true, // Barra di progresso
      toastClass: 'ngx-toastr-toast custom-toast'
    });
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      progressBar: true
    });
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      progressBar: true
    });
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      progressBar: true
    });
  }
}
