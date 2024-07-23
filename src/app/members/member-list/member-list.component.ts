import { Component, inject } from '@angular/core';
import { Member } from '../../interfaces/Member';
import { MembersService } from '../../services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {

  members: Member[] = []
  private memberService = inject(MembersService)

  ngOnInit(): void {
    this.loadMembers();

  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: member => this.members = member
    })
  }
}
