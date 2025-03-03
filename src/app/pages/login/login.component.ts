import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { userDetails } from '../../models/userDetails.model';
import { userSignupData } from '../../models/userSignupData.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordVisible:boolean=false;

  SignupDataObject:userSignupData=new userSignupData();
  onLogin(loginForm:NgForm){
    alert("login success")
  }

  togglePassword(){
    this.passwordVisible=!this.passwordVisible;
  }
}
