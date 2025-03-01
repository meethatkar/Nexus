import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit{
  isMenuOpen = false;
  username="";
  password="";
  // authService=inject(AuthService);
  role:any;
  isManager:boolean=false;
  isMember:boolean=false;
  

  ngOnInit(): void {
    // this.role=localStorage.getItem('role');
    // console.log(this.role)
    // if(this.role=="manager"){
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
    
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  // isLoggedIn():boolean{
  //   return this.authService.isAutheticated();
  // }

  isLoggedIn(){return true}
  logout(){
    // this.userObj.isLogin=false;
    console.log(this.role);
    // this.authService.logout();
  }

}
