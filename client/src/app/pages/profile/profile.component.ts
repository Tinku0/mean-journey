import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  constructor(private http: HttpClient){
    this.profileForm = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      gender: new FormControl('')
    })
  }

  ngOnInit(){
    this.getUserProfile();
  }


  getUserProfile(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    this.http.post('http://localhost:3000/user/get',this.profileForm.value, {headers: headers}).subscribe({
      next: (res: any) => {
        console.log(res)
        this.profileForm.patchValue(res.user)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateProfile(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    this.http.post('http://localhost:3000/user/update',this.profileForm.value, {headers: headers}).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
