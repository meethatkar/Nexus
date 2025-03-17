import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IResultUserDetailsGet, userDetailsGet } from '../../models/userDetailsGet.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IResultUserDetails } from '../../models/userDetails.model';
import { userSignupData } from '../../models/userSignupData.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
    private userDetailId = new BehaviorSubject<string>(localStorage.getItem('userDetailId')||"");
    userDetailId$$ = this.userDetailId.asObservable();    //$ symbol used as it is an observale

    private userId = new BehaviorSubject<string>(localStorage.getItem('userId')||"");
    userId$$ = this.userId.asObservable();    //$ symbol used as it is an observale

    // private userRoleSubject = new BehaviorSubject<string>(localStorage.getItem('role')||"not assigned");
    // userRole$$ = this.userRoleSubject.asObservable();    //$ symbol used as it is an observale

  mainApi="http://localhost:5194/api"
  http=inject(HttpClient);
  // http://localhost:5194/api/UserDetail/UpdateUserDetailsById?userDetailId=119

  constructor() { }

  public getUserDetailById(id:any):Observable<IResultUserDetailsGet>{
    return this.http.get<IResultUserDetailsGet>(`${this.mainApi}/UserDetail/GetUserDetailsByUserId?userId=${id}`,{});
  }

  public getUserSignupDetaiById(id:any):Observable<IResultUserDetailsGet>{
    return this.http.get<IResultUserDetailsGet>(`${this.mainApi}/User/GetUserById?userId=${id}`,{});
  }

  public updateUserDetailById(id:any,obj:userDetailsGet):Observable<IResultUserDetails>{
    return this.http.put<IResultUserDetails>(`${this.mainApi}/UserDetail/UpdateUserDetailsById?userDetailId=${id}`,obj);
  }      

  
  //          ***********UserDetailID************
  setuserDetailId(id:string){
    localStorage.setItem('userDetailId',id);
    this.userDetailId.next(id);
  }
  getuserDetailId(){
    return  localStorage.getItem('userDetailId');
  }
  removeuserDetailId(){
    localStorage.setItem('userDetailId',"");
    this.userDetailId.next("");
  }


  //        ******userID************
  setuserId(id:string){
    localStorage.setItem('userId',id);
    this.userId.next(id);
  }
  getuserId(){
    return  localStorage.getItem('userId');
  }
  removeuserId(){
    localStorage.setItem('userId',"");
    this.userId.next("");
  }

  //        *******ROLE*************
  // setUserRole(role:string){
  //   localStorage.setItem('role',role);
  //   this.userId.next(role);
  // }
  // getUserRole(){
  //   return  localStorage.getItem('role');
  // }
  // removeUserRole(){
  //   localStorage.setItem('role',"not assigned");
  //   this.userId.next("not assigned");
  // }
}
