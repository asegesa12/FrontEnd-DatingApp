import { inject, Injectable, signal } from '@angular/core';
import { LoginForm } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseUrl = 'https://localhost:5001/api/';
  private _http = inject(HttpClient)
  currentUser = signal<User | null>(null);
  constructor() { }

  loginService(FormData: LoginForm){
    return this._http.post<User>(`${this.BaseUrl}account/login`, FormData).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    )
  }

  registerServices(FormData: LoginForm){
    return this._http.post<User>(`${this.BaseUrl}account/register`, FormData).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
