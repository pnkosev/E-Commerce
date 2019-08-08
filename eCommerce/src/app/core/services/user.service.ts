import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const baseURL = `${environment.ApiURL}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  register(payload: object): Observable<object> {
    return this.http.post(`${baseURL}/register`, payload);
  }

  login(payload: object): Observable<object> {
    return this.http.post(`${baseURL}/login`, payload);
  }

  get token() {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    localStorage.clear();
  }

  saveUser(res) {
    localStorage.setItem('authToken', res.jwt);
    localStorage.setItem('firstName', res.user.firstName);
    localStorage.setItem('lastName', res.user.lastName);
    localStorage.setItem('isAdmin', (res.user.roles.indexOf('Admin') !== -1).toString());
  }
}
