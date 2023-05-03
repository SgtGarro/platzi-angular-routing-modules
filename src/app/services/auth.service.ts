import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth.model';
import { User } from '../model/user.model';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string;
  private user: BehaviorSubject<User | null>;

  public user$: Observable<User | null>;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.API_URL = `${environment.API_URL}/api/auth`;
    this.user = new BehaviorSubject<User | null>(null);

    this.user$ = this.user.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  profile() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<User>(`${this.API_URL}/profile`, { headers })
      .pipe(tap((user) => this.user.next(user)));
  }
  /* profile(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.API_URL}/profile`, {
      headers,
    });
  } */

  fetchLoginAndProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()!));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
