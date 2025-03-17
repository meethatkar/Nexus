import { IResultUserDetailsGet, userDetailsGet } from './../../models/userDetailsGet.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userSignupData } from '../../models/userSignupData.model';
import { UserDetailService } from '../../services/getUser/user-detail.service';
import {jwtDecode} from "jwt-decode";
import { UserSignupService } from '../../services/signup/user-signup.service';
import { LoaderComponent } from "../loader/loader.component";
import { forkJoin } from 'rxjs';
import { IResultUserDetails } from '../../models/userDetails.model';

@Component({
  selector: 'app-myaccount',
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css',
  providers: [UserDetailService]
})
export class MyaccountComponent implements OnInit{
  IsEdit={
    'profile':false,
    'account':false
  }
  userSignupDataObj:userSignupData=new userSignupData();
  userDetailServiceObj = inject(UserDetailService);
  userDetailsGetObj = new userDetailsGet();
  UserSignupServiceObj = inject(UserSignupService)

  userData: any;
  passwordVisible:boolean=false;
  role ="manager";
  error:any={}
  isLoading = false;

  


token:any = this.UserSignupServiceObj.getToken();
decoded: any = jwtDecode(this.token); // Decode JWT

  
  ngOnInit(): void {
    this.isLoading=true;

    forkJoin({
     userDetails:  this.userDetailServiceObj.getUserDetailById(this.decoded.UserId),
     SignupDetaila: this.userDetailServiceObj.getUserSignupDetaiById(this.decoded.UserId)
    }).subscribe({
      next: (res) => {
        if(res.userDetails.result && res.SignupDetaila.result){
          this.userDetailsGetObj = res.userDetails.data;
          this.userDetailsGetObj.username = res.SignupDetaila.data.username;
          this.userDetailsGetObj.email = res.SignupDetaila.data.email;
          this.userDetailsGetObj.password = res.SignupDetaila.data.password;
        }
        this.isLoading=false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 400 || error.status === 401) {
                for (let key in error.error) {
                  console.log(error.error[key]);
                  console.log(this.userDetailsGetObj.userId+" error block of my account section uuser signup data")
                  this.error[key] = error.error[key];       //Store each error with its key
                }
        
              }
              else {
                alert("Unexpected error occured"+error.message);
              }
      }
    })
  }

  toggleEditP(on:boolean) {
    this.IsEdit.profile = on;
    this.isLoading = true;
    this.userDetailServiceObj.updateUserDetailById(this.userDetailServiceObj.getuserDetailId(),this.userDetailsGetObj).subscribe((res:IResultUserDetails) => {
      this.isLoading = false;
      if(res.result == true){
        alert("Profile updated successfully!");
        this.userDetailsGetObj = res.data;
      }
      else{
        alert("else block execute, check console")
        console.log("Else block error: "+res.error);
      }
    }, (error) => {
      this.isLoading = false;
      if (error.status === 400 || error.status === 401) {
              for (let key in error.error) {
                console.log(error.error[key]);
                console.log(this.userDetailsGetObj.userId+" error block of my account section uuser signup data")
                this.error[key] = error.error[key];       //Store each error with its key
              }
      
            }
            else {
              alert("Unexpected error occured"+error.message);
            }
    })
    if (!this.IsEdit.profile) {
    }
  }



  // toggleEditA(on:boolean) {
  //   this.IsEdit.account = on;
  //   if (!this.IsEdit.account) {
  //     alert("Profile updated successfully!");
  //   }
  // }

  togglePassword(){
    this.passwordVisible=!this.passwordVisible;
  }
}
