import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResultLogin } from '../../models/userLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

http= inject(HttpClient);

  constructor() { }
  // http://localhost:5194/api/Email/InviteUser

sendMail(data:any):Observable<IResultLogin>{
  return this.http.post<IResultLogin>("http://localhost:5194/api/Email/InviteUser",data);
}
}
