import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { RegisterUserDto } from '../user/dto/user.dto';

export interface RegisterUser {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  email: string;
  password: string;
  accessToken?: string; // accessToken è opzionale solo quando non è ancora disponibile
}

export interface LoginUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  isAdmin?: boolean; 
  accessToken?: string;
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.userSubject.next(user);
      } catch (error) {
        console.error('Errore nel parsing dell\'utente dal localStorage', error);
        localStorage.removeItem('user'); // Rimuovi l'utente malformato dal localStorage
      }
    }
  }

  register(user: RegisterUserDto): Observable<{ accessToken?: string; message: string }> {
    return this.http.post<{ accessToken?: string; message: string }>(`${this.apiUrlAuth}/register`, user).pipe(
      tap(response => {
        if (response.accessToken) {
          const loggedInUser: RegisterUser = { 
            ...user, 
            isAdmin: user.role ?? false, 
            accessToken: response.accessToken 
          };
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          this.userSubject.next(loggedInUser);
        } else {
          console.log(response.message);
        }
      })
    );
  }

  login(user: LoginUser): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrlAuth}/login`, user).pipe(
      tap(response => {
        if (response.accessToken) {
          // Decodifica il token per ottenere firstName e lastName
          const decodedToken = jwt_decode<any>(response.accessToken);
          const loggedInUser: LoginUser = { 
            ...user, 
            accessToken: response.accessToken,
            firstName: decodedToken.firstName,  // Aggiungi firstName
            lastName: decodedToken.lastName     // Aggiungi lastName
          };
          
          localStorage.setItem('user', JSON.stringify(loggedInUser)); // Salva l'utente con le informazioni aggiuntive
          this.userSubject.next(loggedInUser); // Imposta il comportamento utente
        }
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('user'); // Rimuove tutto l'oggetto utente
    this.userSubject.next(null); // Resetta il comportamento dell'utente
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    return user ? user.isAdmin ?? false : false;
  }

  private getUserFromToken(token: string | null = localStorage.getItem('accessToken')): { firstName: string, lastName: string } {
    if (!token) {
      console.error('Token non trovato');
      return { firstName: '', lastName: ''};
    }
  
    try {
      const decodedToken = jwt_decode<any>(token);  // Decodifica il token
      return { firstName: decodedToken.firstName, lastName: decodedToken.lastName };
    } catch (error) {
      console.error('Errore durante la decodifica del token:', error);
      return { firstName: '', lastName: ''};
    }
  }
}
