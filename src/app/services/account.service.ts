import { inject, Injectable, signal } from '@angular/core';
import { LoginForm } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  BaseUrl = environment.ApiUrl;
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
