import { Component, inject, OnInit } from '@angular/core';
import { userDetails } from '../../../models/userDetails.model';
import { RouterLink } from '@angular/router';
import { UserSignupService } from '../../../services/signup/user-signup.service';
import { UserDetailService } from '../../../services/getUser/user-detail.service';
import { InviteService } from '../../../services/invite/invite.service';
import { IResultLogin } from '../../../models/userLoginData.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { IResultSignup } from '../../../models/userSignupData.model';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[UserDetailService]
})
export class NavbarComponent  implements OnInit{
  isMenuOpen = false;   //used for side menubar opening
  // authService=inject(AuthService);
  userDetailsObj:userDetails = new userDetails();
  isLogin:any="";
  isInvite=false;
  userSignupServiceObj = inject(UserSignupService);
  userDetailServiceObj=inject(UserDetailService);
  inviteServiceObj = inject(InviteService);
    // role=this.userDetailServiceObj.getUserRole();
    apiData:any = {
      receiver : "",
      sender :  ""
    };
    isLoading = false;

    token:any = this.userSignupServiceObj.getToken();
    decoded:any="";
  ngOnInit(): void {
    // Subscribe to authStatus$ to detect login/logout changes
    this.userSignupServiceObj.authStatus$.subscribe(status => {
      this.isLogin = status;
    });

    if(this.token!=""){
      this.decoded = jwtDecode(this.token); // Decode JWT
    }

    this.userSignupServiceObj.getSignupUserDataByUserid(this.decoded.UserId).subscribe((res:IResultSignup) =>{
      if(res.result == true){
        this.apiData.sender = res.data.email;
        console.log("res.data.email: "+res.data.email);
      }
    })

    // console.log("Ng on in it role (navbar):- "+this.role)
    //      ******* HERE SETTING DEFAULT ROLE IF ...... ******  
    // if(this.role==null){
    //   this.userDetailServiceObj.setUserRole("not assigned");
    // }
  }
  //METHODS
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.role)
  }

  logout(){
    this.userSignupServiceObj.removeToken();
  }

  invite(){
    this.isInvite = !this.isInvite;
  }

  sendMail(){
    this.isLoading = true;
    console.log("Sending mail data: before: "+this.apiData.receiver);

    this.inviteServiceObj.sendMail(this.apiData).subscribe((res:IResultLogin) => {
      this.isLoading=false;
      alert("email send  successfully");
      this.isInvite = false;
    })
  }
}

