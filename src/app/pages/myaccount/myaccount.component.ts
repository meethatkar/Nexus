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
    
  //    ********** OLD APPROACH OF TWO API CALLS ********* 
    
    // this.userDetailServiceObj.getUserDetailById(this.decoded.UserId).subscribe((res:IResultUserDetailsGet)=>{
    //   if(res.result==true){
    //   this.userDetailsGetObj=res.data;
    //   console.log(this.userDetailsGetObj+" my account section (userDetailsObj)")

    //   //        ******** NESTED METHOD *******
    //   this.userDetailServiceObj.getUserSignupDetaiById(this.decoded.UserId).subscribe((res:IResultUserDetailsGet)=>{
    //     if(res.result==true){
    //       this.userDetailsGetObj.username = res.data.username;
    //       this.userDetailsGetObj.email = res.data.email;
    //       this.userDetailsGetObj.password = res.data.password;
    //       this.isLoading=false;
    //     }
    //   }, (error) => {
    //     this.isLoading=false;
    //     this.error = {};
    //     if (error.status === 400 || error.status === 401) {
    //       for (let key in error.error) {
    //         console.log(error.error[key]);
    //         console.log(this.userDetailsGetObj.userId+" error block of my account section uuser signup data")
    //         this.error[key] = error.error[key];       //Store each error with its key
    //       }
  
    //     }
    //     else {
    //       alert("Unexpected error occured"+error.message);
    //     }
    //   })
    //   }
    //   else{
    //     this.isLoading=false;
    //     alert("Else block executed");
    //   }
    // }, (error) => {
    //   this.isLoading=false;
    //   this.error = {};
    //   if (error.status === 400 || error.status === 401) {
    //     for (let key in error.error) {
    //       console.log(error.error[key]);
    //       console.log(this.userDetailsGetObj.userId+" error block of my account section user details data")
    //       this.error[key] = error.error[key];       //Store each error with its key
    //     }
    //   }

    //   else {
    //     alert("Unexpected error occured"+error.message);
    //   }
    // })
  }

  toggleEditP(on:boolean) {
    this.IsEdit.profile = on;
    if (!this.IsEdit.profile) {
      alert("Profile updated successfully!");
    }
  }



  toggleEditA(on:boolean) {
    this.IsEdit.account = on;
    if (!this.IsEdit.account) {
      alert("Profile updated successfully!");
    }
  }

  togglePassword(){
    this.passwordVisible=!this.passwordVisible;
  }
}
