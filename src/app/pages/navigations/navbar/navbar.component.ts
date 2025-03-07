import { Component, OnInit } from '@angular/core';
import { userDetails } from '../../../models/userDetails.model';
import { RouterLink } from '@angular/router';
import { UserSignupService } from '../../../services/signup/user-signup.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit{
  isMenuOpen = false;   //used for side menubar opening
  // authService=inject(AuthService);
  userDetailsObj:userDetails = new userDetails();
  isLogin:any="";
  role="member";
  userSignupService:UserSignupService = new UserSignupService();

  ngOnInit(): void {
    // this.role=localStorage.getItem('role');
    // console.log(this.role)
    // if(this.role=="manager"){w
    //   this.isManager=true;
    // }
    // else if(this.role=="member"){
    //   this.isMember=true;
    // }
    // this.authService.userRole$.subscribe(r => {
    //   this.role=r;
    // })
    // Subscribe to authStatus$ to detect login/logout changes
    this.userSignupService.authStatus$.subscribe(status => {
      this.isLogin = status;
    });
  }
  //METHODS
  constructor(){
    // this.userDetailsObj.role="member";
    this.role="member";
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  logout(){
    this.role="not assigned";
    this.userSignupService.removeToken();
  }

}
