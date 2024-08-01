import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Member } from '../interfaces/Member';
import { environment } from '../../environments/environment';
import { of, tap } from 'rxjs';
import { Photo } from '../interfaces/Photo';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient)

  BaseApiUrl = environment.ApiUrl;
  members = signal<Member[]>([]);

  getMembers(){
    return this.http.get<Member[]>(this.BaseApiUrl + 'users' ).subscribe({
      next: members => this.members.set(members)
    })
  }

  getMember(username: string){

    const member = this.members().find(x => x.username === username);
    if(member !== undefined) return of(member);

    return this.http.get<Member>(this.BaseApiUrl + 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put(this.BaseApiUrl + 'users', member).pipe(
      tap(() => {
        this.members.update(members => members.map(m => m.username === member.username
          ? member: m ))
      })
    )
  }

  setMainPhoto(photo: Photo){
    return this.http.put(this.BaseApiUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      tap(() => {
        this.members.update(members => members.map(member => {
          if(member.photos.includes(photo)){
            member.photoUrl = photo.url
          }
          return member;
        }))
      })
    )
  }

  deletePhoto(photo: Photo){
    return this.http.delete(this.BaseApiUrl + 'users/delete-photo/' + photo.id).pipe(
      tap(() => {
        this.members.update(members => members.map(m => {
          if(m.photos.includes(photo)){
            m.photos = m.photos.filter(x => x.id !== photo.id)
          }
          return m
        }))
      })
    )
  }



}
