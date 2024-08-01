import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../interfaces/Member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../services/members.service';
import { Photo } from '../../interfaces/Photo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editor-photo',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './editor-photo.component.html',
  styleUrl: './editor-photo.component.css'
})
export class EditorPhotoComponent implements OnInit  {

  uploader?: FileUploader;
  member = input.required<Member>();
  hasBaseDropZoneOver = false;
  baseUrl = environment.ApiUrl;
  memberChange = output<Member>();
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.initializeUploader();

  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  deletePhoto(photo: Photo){
    this.memberService.deletePhoto(photo).subscribe({
      next: _ => {
        const updateMember = { ...this.member()};
        updateMember.photos = updateMember.photos.filter(x => x.id !== photo.id);
        this.memberChange.emit(updateMember);
        this.toastr.success('Photo deleted')

      }
    })
  }

  setMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: _ => {
        const user = this.accountService.currentUser();
        if(user){
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }

        const updateMember = { ...this.member()}
        updateMember.photoUrl = photo.url;
        updateMember.photos.forEach(p => {
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;

        });

        this.memberChange.emit(updateMember);


      }
    })
  }

  initializeUploader(){
   const usuario = this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024



    })

    console.log(usuario);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const updateMember = { ...this.member()}
      updateMember.photos.push(photo);
      this.memberChange.emit(updateMember);
    }

  }
}
