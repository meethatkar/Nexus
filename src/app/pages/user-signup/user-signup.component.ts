import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserSignupService } from '../../services/user-signup.service';
import { IResultSignup, userSignupData } from '../../models/userSignupData.model';
import { Router, RouterLink } from '@angular/router';
import { userDetails } from '../../models/userDetails.model';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user-signup',
  imports: [CommonModule, FormsModule, RouterLink, LoaderComponent],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  IsMatch:boolean=false;  
  passwordVisible: boolean = false;
  userSignupDataObj: userSignupData = new userSignupData();
  signupUserService:UserSignupService = new UserSignupService();
  showUserDetailForm:boolean=false;
  userDetailsObj:userDetails=new userDetails();
  isLoading = false;


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
    this.isLoading=true;
    this.signupUserService.addSignupUser(this.userSignupDataObj).subscribe((res:IResultSignup)=>{
      // if(res.result){
      if(res.token!="" || res.token!=null){
        this.isLoading=false
        alert("signup successful")
        this.userSignupDataObj=new userSignupData();
        this.userDetailsObj.token=res.token;
        console.log("done");
        this.showUserDetailForm=true;
      }
      else{
        this.isLoading=false
        alert("else block executed");
      }
    }, error=>{
      alert("error bloack executed:  "+error.message);
      this.isLoading=false
    })

    

    // alert("sign upped")
    // this.showUserDetailForm=true;
    this.userDetailsObj.token="oad"   //proof of user signup (acts as a login id)
  }

  onRegister(regiData:NgForm){
    alert("register successful");
    // this.userDetailsObj.firstName.push()
    this.router.navigate(['/home'])
    
  }
  togglePassword(): void {
    this.passwordVisible=!this.passwordVisible;
  }
}
