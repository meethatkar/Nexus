import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserSignupService } from '../../services/user-signup.service';
import { IResult, userSignupData } from '../../models/userSignupData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  IsMatch:boolean=false;  
  passwordVisible: boolean = false;
  SignupDataObject: userSignupData = new userSignupData();
  // signupUserService:UserSignupService = new signupUserService();
  showUserDetailForm:boolean=false;

  constructor(private router:Router){}

  comparePassword(pws:string,cPws:string){
    if(pws===cPws){
      this.IsMatch=true;
    }
    else{
      this.IsMatch=false;
    }
  }
  onSignup(regiData:NgForm){
    // this.signupUserService.addSignupUser(this.SignupDataObject).subscribe((res:IResult)=>{
    //   if(res.result==true){
    //     alert("signup successful")
    //     this.SignupDataObject=new userSignupData();
    //     this.showUserDetailForm=true;
    //     console.log("done");
    //   }
    //   else{
    //     alert("else bloack executed");
    //   }
    // }, error=>{
    //   alert("error bloack executed:  "+error.message);
    // })

    alert("sign upped")
    this.showUserDetailForm=true;

  }

  onRegister(regiData:NgForm){
    alert("register successful");
    this.router.navigate([''])
    
  }
  togglePassword(): void {
    this.passwordVisible=!this.passwordVisible;
  }
}
