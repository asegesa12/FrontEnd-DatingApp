import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

   accountService = inject(AccountService);
   private router = inject(Router)
   private toastr = inject(ToastrService)

  model: any = {};

  login(){
    this.accountService.loginService(this.model)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('members')

        },
        error: error => this.toastr.error(error.error)
      })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
