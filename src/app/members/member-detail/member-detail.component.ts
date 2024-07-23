import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../interfaces/Member';
import { MembersService } from '../../services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit  {


  private memberService = inject(MembersService)
  private route = inject(ActivatedRoute);
  member?:Member;
  IMAGES: GalleryItem[] = [];

  ngOnInit(): void {

  this.loadMember();

  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');

    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: memberUsername => {
        this.member = memberUsername
        this.member.photos.map(photo => {
          this.IMAGES.push(new ImageItem({src: photo.url, thumb: photo.url}))
        })

      }
    })

  }

}
