import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userDetails } from '../../models/userDetails.model';
import { userSignupData } from '../../models/userSignupData.model';

@Component({
  selector: 'app-myaccount',
  imports: [FormsModule,CommonModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent{

  // IsEdit:boolean=false;
  IsEdit={
    'profile':false,
    'professional':false,
    'account':false
  }
  userDetailsObj:userDetails=new userDetails();
  userSignupDataObj:userSignupData=new userSignupData();

  userData: any;
  passwordVisible:boolean=false;
  role ="manager";

  

  // workDetails = [
  //   { id: 101, task: "Project A - Task 1" },
  //   { id: 102, task: "Project B - Task 2" },
  //   { id: 103, task: "Project C - Task 3" }
  // ];
  

  toggleEditP(on:boolean) {
    this.IsEdit.profile = on;
    if (!this.IsEdit.profile) {
      // When saving (status = false), update local storage
      // localStorage.setItem('user', JSON.stringify(this.userData));
      alert("Profile updated successfully!");
    }
  }


  // toggleEditPro(on:boolean) {
  //   this.IsEdit.professional = on;
  //   if (this.IsEdit.professional) {
  //     // When saving (status = false), update local storage
  //     localStorage.setItem('user', JSON.stringify(this.userData));
  //     alert("Profile updated successfully!");
  //   }
  // }


  toggleEditA(on:boolean) {
    this.IsEdit.account = on;
    if (!this.IsEdit.account) {
      // When saving (status = false), update local storage
      // localStorage.setItem('user', JSON.stringify(this.userData));

      alert("Profile updated successfully!");
    }
  }

  togglePassword(){
    this.passwordVisible=!this.passwordVisible;
  }
}
