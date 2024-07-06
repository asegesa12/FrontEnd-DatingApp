import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  model: any = {}
  http = inject(AccountService)
  private toastr = inject(ToastrService)
  cancelRegister = output<boolean>();

  register(){
    this.http.registerServices(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
