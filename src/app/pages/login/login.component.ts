import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { userSignupData } from '../../models/userSignupData.model';
import { Router, RouterLink } from '@angular/router';
import { UserLoginService } from '../../services/user-login.service';
import { LoaderComponent } from '../loader/loader.component';
import { UserSignupService } from '../../services/user-signup.service';
import { IResultLogin, UserLoginData } from '../../models/userLoginData.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordVisible:boolean=false;                        //CREATED TO HIDE AND SHOW PASSWORD
  userLoginService:UserLoginService=new UserLoginService();           //CREATED FOR USING API CALL
  router = inject(Router);                              //CREATED TO NAVIGATE USER
  userSignupService:UserSignupService=new UserSignupService();      //CREATED FOR SETTING VALUE OF TOKEN
  error: { [key: string]: string } = {};                // Define as an object, CREATED TO STORE BACKEND ERROR
  userLoginObj:UserLoginData= new UserLoginData();                  //created for data binindg and sending that data
  isLoading=false;                              //created to show loadin efffect

  SignupDataObject:userSignupData=new userSignupData();
  onLogin(loginForm:NgForm){
    this.isLoading=true;
    this.userLoginService.userLogin(this.userLoginObj).subscribe((res:IResultLogin) => {
      if(res.result==true){
        this.isLoading=false;
        alert("login success");
        this.userLoginObj = new UserLoginData();
        this.userSignupService.setToken(res.data);
        this.router.navigate(['/home']);
      }
      else{
        this.isLoading=false;
        alert("Unexpected error occured in elss block");
        alert(res.data);
        console.log("data: "+res.data);
        console.log("message: "+res.message);
      }
    }, (error) => {
      this.isLoading=false;
      if(error.status === 400) {
        for(let key in error.error.error){
          console.log(error.error.error[key]);
          this.error[key] = error.error.error[key];     //STORE EACH ERROR WITH ITS KEY
        }
      }
      else{
        alert("unexpected error occurec in error block "+ error.message);
      }
    })

  }

  togglePassword(){
    this.passwordVisible=!this.passwordVisible;
  }
}
