import { Injectable } from '@angular/core';
import { IResult, userSignupData } from '../models/userSignupData.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  mainApi="https://localhost:7156/api"

  constructor(private http: HttpClient) { }

  public addSignupUser(obj:userSignupData):Observable<IResult>{
    return this.http.post<IResult>(this.mainApi + "/User/addSignupUser",obj);
  }
}
