import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { RegisterUserDto } from '../user/dto/user.dto';

export interface RegisterUser {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  email: string;
  password: string;
  accessToken?: string; // accessToken è opzionale solo quando non è ancora disponibile
  id: string;
}

export interface LoginUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  accessToken?: string;
  id?: string;
}

export type User = RegisterUser | LoginUser;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlAuth = `${environment.BASE_URL}/auth`;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);

        // Recupera id dal token, se mancante
        if (!user.id && user.accessToken) {
          const decodedToken = jwt_decode<any>(user.accessToken);
          user.id = decodedToken.id;
        }

        this.userSubject.next(user);
      } catch (error) {
        console.error('Errore nel parsing dell\'utente dal storage', error);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
      }
    }
  }


  register(user: RegisterUserDto): Observable<{ accessToken?: string; message: string }> {
    return this.http.post<{ accessToken?: string; message: string }>(`${this.apiUrlAuth}/register`, user).pipe(
      tap(response => {
        if (response.accessToken) {
          try {
            // Decodifica il token
            const decodedToken = jwt_decode<any>(response.accessToken);

            // Aggiungi i log per il debug
            console.log('Token decodificato:', decodedToken); // Mostra tutti i dati decodificati
            console.log('ID utente estratto (userId):', decodedToken.userId); // Mostra solo userId

            // Crea l'oggetto utente
            const loggedInUser: RegisterUser = {
              ...user,
              isAdmin: user.role ?? false, // Assumi che `role` indichi se è admin
              accessToken: response.accessToken,
              id: decodedToken.userId // Usa l'ID estratto dal token
            };

            // Salva i dati utente nello storage
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            this.userSubject.next(loggedInUser); // Aggiorna lo stato utente
          } catch (error) {
            console.error('Errore durante la decodifica del token di registrazione:', error);
          }
        } else {
          console.log(response.message); // Mostra un messaggio se il token non è presente
        }
      })
    );
  }

  login(user: LoginUser, rememberMe: boolean): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrlAuth}/login`, user).pipe(
      tap(response => {
        if (response.accessToken) {
          // Decodifica il token
          const decodedToken = jwt_decode<any>(response.accessToken);

          const loggedInUser: LoginUser = {
            ...user,
            accessToken: response.accessToken,
            id: decodedToken.userId,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            isAdmin: decodedToken.role === 'admin'
          };

          // Salva i dati dell'utente
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('authToken', response.accessToken);
          storage.setItem('user', JSON.stringify(loggedInUser));

          this.userSubject.next(loggedInUser);
        }
      }),
      catchError(error => {
        let errorMessage = 'Si è verificato un errore.';

        // Gestione di errori specifici
        if (error.status === 401) {
          errorMessage = 'Email o password errati.';
        } else if (error.status === 404) {
          errorMessage = 'Utente non trovato.';
        } else if (error.status === 400) {
          errorMessage = 'Richiesta non valida. Verifica i dati inseriti.';
        }

        // Log dell'errore (opzionale)
        console.error('Errore durante il login:', error);

        // Emetti un errore personalizzato
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    // Rimuove il token sia da localStorage che da sessionStorage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Rimuove l'oggetto utente (se presente)
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    // Resetta lo stato dell'utente nel BehaviorSubject
    this.userSubject.next(null);
  }


  getUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    return user ? user.isAdmin ?? false : false;
  }

}
