import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('accessToken');

      let authReq = req;
      if (token) {
        // Clona la richiesta e aggiunge l'intestazione Authorization con il token
        authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(authReq).pipe(
          catchError(error => {
            if (error.status === 401) {
              // Gestisce l'errore di autenticazione
              console.error('Non autorizzato - reinderizzo al login');
              // Rimuove il token dal localStorage se è scaduto
              localStorage.removeItem('accessToken');
            }
            return of(error);
          })
        )
      }

      // Se non c'è token, invia la richiesta originale
      return next.handle(req);
  }
}
