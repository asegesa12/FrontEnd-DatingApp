import { Component, HostListener, Inject, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../interfaces/Member';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EditorPhotoComponent } from "../editor-photo/editor-photo.component";

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule, EditorPhotoComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{

  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:any){

    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }

  member?: Member;
  private accountServices = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService)

  ngOnInit(): void {
      this.loadMember();
  }

  loadMember(){
    const user = this.accountServices.currentUser();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {

        this.toastr.success('Profile Updated')
        this.editForm?.reset(this.member);
      }
    })
  }

  onMemberChange(event: Member){
    this.member = event;
  }
}
