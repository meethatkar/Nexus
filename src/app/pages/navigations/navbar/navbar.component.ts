import { Component, OnInit } from '@angular/core';
import { userDetails } from '../../../models/userDetails.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit{
  isMenuOpen = false;   //used for side menubar opening
  // authService=inject(AuthService);
  // role:any;
  userDetailsObj:userDetails = new userDetails();

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
  }
  //METHODS
  constructor(){
    this.userDetailsObj.role="member";
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  // isLoggedIn():boolean{
  //   return this.authService.isAutheticated();
  // }

  isLoggedIn():boolean{
    if(this.userDetailsObj.token==""){
      console.log(this.userDetailsObj.token+"token number");
      return false;
    }
    else{
      return true;
    }
  }
  logout(){
    // this.userObj.isLogin=false;
    console.log(this.userDetailsObj.role);
    // this.authService.logout();
  }

}
