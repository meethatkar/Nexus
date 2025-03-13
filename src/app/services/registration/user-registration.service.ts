import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResultUserDetails, userDetails } from '../../models/userDetails.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  mainApi="http://localhost:5194/api"
  private http=inject(HttpClient);
  constructor() { }

  public addRegisterUser(obj:userDetails):Observable<IResultUserDetails>{
    return this.http.post<IResultUserDetails>(this.mainApi + "/UserDetail/AddUserDetails",obj);
  }
}
