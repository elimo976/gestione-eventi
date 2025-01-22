import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.BASE_URL}/users`

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<User> {
    if (!userId) {
      console.error('ID utente non valido');
      return throwError(() => new Error('ID utente non valido'));
    }
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: string, updateData: Partial<User>): Observable<User> {
    if (!userId) {
      console.error('ID utente non valido');
      return throwError(() => new Error('ID utente non valido'));
    }
    return this.http.patch<User>(`${this.apiUrl}/profile/${userId}`, updateData).pipe(
      tap(updateData => {
        console.log('Profilo aggiornato con successo', this.updateUser);
      }),
      catchError(error => {
        console.error('Errore durante l\'aggiornamento del profilo:', error);
        return throwError(() => new Error('Impossibile aggiornare il profilo'));
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log('Utente eliminato con successo');
      }),
      catchError(error => {
        console.error('Errore durante l\'eliminazione dell\'utente:', error);
        return throwError(() => new Error('Impossibile eliminare l\'utente'));
      })
    );
  }

  getAvatars(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.BASE_URL}/avatars`);
  }
}
