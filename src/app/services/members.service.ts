import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Member } from '../interfaces/Member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient)

  BaseApiUrl = environment.ApiUrl;

  getMembers(){
    return this.http.get<Member[]>(this.BaseApiUrl + 'users' );
  }

  getMember(username: string){
    return this.http.get<Member>(this.BaseApiUrl + 'users/' + username);
  }

}
