import { inject, Injectable } from '@angular/core';
import { IResultSignup, userSignupData } from '../models/userSignupData.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {
  static getToken() {
    throw new Error('Method not implemented.');
  }

  private userTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token')||"");
  userToken$$ = this.userTokenSubject.asObservable();    //$ symbol used as it is an observale

  mainApi="http://localhost:5194/api"
  private http=inject(HttpClient);
  constructor() { }

  public addSignupUser(obj:userSignupData):Observable<IResultSignup>{
    return this.http.post<IResultSignup>(this.mainApi + "/User/addSignupUser",obj);
  }

  setToken(token:string){
    localStorage.setItem('Token',token);
    this.userTokenSubject.next(token);
  }
  getToken(){
    return this.userTokenSubject.getValue();
  }
  removeToken(){
    localStorage.setItem('Token',"");
    this.userTokenSubject.next("");
  }
}
