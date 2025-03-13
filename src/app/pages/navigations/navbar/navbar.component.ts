import { Component, inject, OnInit } from '@angular/core';
import { userDetails } from '../../../models/userDetails.model';
import { RouterLink } from '@angular/router';
import { UserSignupService } from '../../../services/signup/user-signup.service';
import { UserDetailService } from '../../../services/getUser/user-detail.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[UserDetailService]
})
export class NavbarComponent  implements OnInit{
  isMenuOpen = false;   //used for side menubar opening
  // authService=inject(AuthService);
  userDetailsObj:userDetails = new userDetails();
  isLogin:any="";
  userSignupService = inject(UserSignupService);
  userDetailServiceObj=inject(UserDetailService);
    // role=this.userDetailServiceObj.getUserRole();

  ngOnInit(): void {
    // Subscribe to authStatus$ to detect login/logout changes
    this.userSignupService.authStatus$.subscribe(status => {
      this.isLogin = status;
    });

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
    this.userSignupService.removeToken();
  }

}
