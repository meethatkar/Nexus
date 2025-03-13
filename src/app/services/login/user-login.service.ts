import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResultSignup } from '../../models/userSignupData.model';
import { Observable } from 'rxjs';
import { IResultLogin, UserLoginData } from '../../models/userLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  
  mainApi="http://localhost:5194/api";
  private http=inject(HttpClient);
  constructor() { }

  public userLogin(obj:UserLoginData):Observable<IResultLogin>{
    // return this.http.post<IResultSignup>(this.mainApi + "/Login/UserLogin", obj);
    return this.http.post<IResultLogin>(`${this.mainApi}/Login/Email/Username?info=${obj.loginData}&password=${obj.password}`,
      {}
    )
  }


}
