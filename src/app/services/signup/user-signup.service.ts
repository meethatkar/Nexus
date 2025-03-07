import { inject, Injectable } from '@angular/core';
import { IResultSignup, userSignupData } from '../../models/userSignupData.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  private userTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token')||"");
  userToken$$ = this.userTokenSubject.asObservable();    //$ symbol used as it is an observale

  private authStatusListener = new BehaviorSubject<boolean>(!!this.getToken());
  authStatus$ = this.authStatusListener.asObservable();
  // authStatusListener THIS IS CREATED TO CHECK  IS LOGIN OR NOT

  mainApi="http://localhost:5194/api"
  private http=inject(HttpClient);
  constructor() { }

  public addSignupUser(obj:userSignupData):Observable<IResultSignup>{
    return this.http.post<IResultSignup>(this.mainApi + "/User/addSignupUser",obj);
  }

  setToken(token:string){
    localStorage.setItem('token',token);
    this.userTokenSubject.next(token);
    this.authStatusListener.next(true);     //IS LOGGED IN
  }
  getToken(){
    return  localStorage.getItem('token');
  }
  removeToken(){
    localStorage.setItem('token',"");
    this.userTokenSubject.next("");
    this.authStatusListener.next(false);      //IS NOT LOGGED IN
  }
}
