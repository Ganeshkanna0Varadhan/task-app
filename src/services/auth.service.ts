import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  router = inject(Router);
  API_KEY = 'AIzaSyCUk081PoNWceymYpwxQyVbwm5ZAkMLUSs';
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  platformId = inject(PLATFORM_ID);
  private tokenExpireTimer: any;
  constructor() { }

  singUp(email: string, password: string) {
    const data = {email, password, returnSecureToken: true};
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, data).
    pipe(catchError(this.handleError), tap(this.handleCreateUser))
  }

  login(email: string, password: string) {
    const data = {email, password, returnSecureToken: true }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, data).pipe(
      catchError(this.handleError), tap(this.handleCreateUser))
  }

  logout() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');

    if (this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
    }
    this.tokenExpireTimer = null;
  }

  private handleError(err: any) {
    let errorMessage = 'An unknown error has occured';
    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage)
    }
    switch(err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This operation is not allowed';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does not exist"
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Provided password is incorrect"
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = "The email and password is not correct";
        break;
    }
    return throwError(() => errorMessage);
  }

  private handleCreateUser = (res: any) => {
    const expiresInTs = new Date().getTime() + (+res.expiresIn * 1000);
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
    this.autoLogout(res.expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin () {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    let data = localStorage?.getItem('user');
    if (!data) {
      return;
    }
    const user = JSON.parse(data);
    if (!user) return;

    const loggedUser = new User(user.email, user.id, user._token, user.expiresIn);

    if (loggedUser.token) {
      this.user.next(loggedUser);
      const timerValue = new Date(user.expiresIn).getTime() - new Date().getTime();
      this.autoLogout(timerValue);
    }
  }

  autoLogout(expireTime: number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }
}
