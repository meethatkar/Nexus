import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserSignupService } from '../../services/user-signup.service';
import { IResultSignup, userSignupData } from '../../models/userSignupData.model';
import { Router, RouterLink } from '@angular/router';
import { IResultUserDetails, userDetails } from '../../models/userDetails.model';
import { LoaderComponent } from "../loader/loader.component";
import { UserRegistrationService } from '../../services/user-registration.service';
import { BehaviorSubject } from 'rxjs';
// import { AuthInterceptorService } from '../../services/auth-interceptor.service';

@Component({
  selector: 'app-user-signup',
  imports: [CommonModule, FormsModule, RouterLink, LoaderComponent],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  IsMatch: boolean = false;
  passwordVisible: boolean = false;
  userSignupDataObj: userSignupData = new userSignupData();
  signupUserService: UserSignupService = new UserSignupService();
  userRegistrationService: UserRegistrationService = new UserRegistrationService();
  showUserDetailForm: boolean = false;
  userDetailsObj: userDetails = new userDetails();
  isLoading = false;
  // error:any={};
  error: { [key: string]: string } = {}; // Define as an object



  constructor(private router: Router) { }

  comparePassword(pws: string, cPws: string) {
    if (pws === cPws) {
      this.IsMatch = true;
    }
    else {
      this.IsMatch = false;
    }
  }

  // Check if error object is empty
  isErrorNotEmpty(): boolean {
    return this.error && Object.keys(this.error).length > 0;
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }


  onSignup(regiData: NgForm) {
    this.isLoading = true;
    this.signupUserService.addSignupUser(this.userSignupDataObj).subscribe((res: IResultSignup) => {
      if (res.result == true) {
        this.isLoading = false;
        alert("Signup done Successfully !!");
        this.userSignupDataObj = new userSignupData();
        // this.token=res.data;
        this.signupUserService.setToken(res.data);      //LOGIC FOR IsLoggedIn
        console.log(res.data);
        this.showUserDetailForm = true;     //THIS WILL OPEN REGISTRATION FORM
      }
      else {
        this.isLoading = false;
        alert("Else block executed");
      }
    }, (error) => {
      this.isLoading = false;
      if (error.status === 400) {
        for (let key in error.error.error) {
          console.log(error.error.error[key]);
          this.error[key] = error.error.error[key];         //Store each error with its key
        }
      }
      else {
        alert("Unexpected error occured " + error.message);
      }
    })
  }


  onRegister(regiData: NgForm) {
    this.isLoading = true;
    this.userRegistrationService.addSignupUser(this.userDetailsObj).subscribe((res: IResultUserDetails) => {
      if (res.result == true) {
        this.isLoading = false;
        alert("register successful");
        this.userDetailsObj = new userDetails();
        this.router.navigate(['/home'])
      }
      else {
        alert("Else block executed");
      }
    }, (error) => {
      this.isLoading = false;
      this.error = {};
      console.log("erorrororr"+error.message);
      if (error.status === 400 || error.status === 401) {
        console.log("errrorr ifff"+error.message)
        for (let key in error.error.error) {
          console.log(error.error.error[key]);
          this.error[key] = error.error.error[key];       //Store each error with its key
        }

        // for (let key in error.error) {
        //   console.log(error.error[key]);
        //   this.error[key] = error.error[key];       //Store each error with its key
        // }
      }
      else {
        alert("Unexpected error occured"+error.message);
        console.log("ofkodkfokodfk");
      }
      console.log("User Detail Data: ", this.userDetailsObj);
    })
  }


}
