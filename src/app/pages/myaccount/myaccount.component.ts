import { IResultUserDetailsGet, userDetailsGet } from './../../models/userDetailsGet.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userSignupData } from '../../models/userSignupData.model';
import { UserDetailService } from '../../services/getUserDetail/user-detail.service';

@Component({
  selector: 'app-myaccount',
  imports: [FormsModule,CommonModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css',
  providers: [UserDetailService]
})
export class MyaccountComponent implements OnInit{

  // IsEdit:boolean=false;
  IsEdit={
    'profile':false,
    // 'professional':false,
    'account':false
  }
  userSignupDataObj:userSignupData=new userSignupData();
  userDetailServiceObj = inject(UserDetailService);
  userDetailsGetObj = new userDetailsGet();

  userData: any;
  passwordVisible:boolean=false;
  role ="manager";
  error:any={}
  

  // workDetails = [
  //   { id: 101, task: "Project A - Task 1" },
  //   { id: 102, task: "Project B - Task 2" },
  //   { id: 103, task: "Project C - Task 3" }
  // ];
  
  ngOnInit(): void {
    this.userDetailServiceObj.getUserDetailById(this.userDetailServiceObj.getId()).subscribe((res:IResultUserDetailsGet)=>{
      if(res.result==true){
      this.userDetailsGetObj=res.data;
      console.log(this.userDetailsGetObj)
      }
      else{
        alert("Else block executed");
      }
    }, (error) => {
      this.error = {};
      if (error.status === 400 || error.status === 401) {
        for (let key in error.error.error) {
          console.log(error.error.error[key]);
          console.log(this.userDetailsGetObj.userId)
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
    })
  }

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
