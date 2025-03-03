import { inject, Injectable } from '@angular/core';
import { IResultSignup, userSignupData } from '../models/userSignupData.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  mainApi="http://localhost:5194/api"
  private http=inject(HttpClient);
  constructor() { }

  public addSignupUser(obj:userSignupData):Observable<IResultSignup>{
    return this.http.post<IResultSignup>(this.mainApi + "/User/addSignupUser",obj);
  }
}
