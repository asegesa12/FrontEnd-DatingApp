import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent {
  private $BaseUrl = environment.ApiUrl;
  private _http = inject(HttpClient);
  validationErrors: string[] = []

  get400Error(){
    this._http.get(`${this.$BaseUrl}buggy/bad-request`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get401Error(){
    this._http.get(`${this.$BaseUrl}buggy/auth`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }
  get404Error(){
    this._http.get(`${this.$BaseUrl}buggy/not-found`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }
  get500Error(){
    this._http.get(`${this.$BaseUrl}buggy/server-error`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  get400ValidationError(){
    this._http.post(`${this.$BaseUrl}account/register`, {}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors = error;
      }
    })
  }
}


