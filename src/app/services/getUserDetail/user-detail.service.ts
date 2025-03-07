import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IResultUserDetailsGet, userDetailsGet } from '../../models/userDetailsGet.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
    private userId = new BehaviorSubject<string>(localStorage.getItem('userId')||"");
    UserId$$ = this.userId.asObservable();    //$ symbol used as it is an observale

  mainApi="http://localhost:5194/api"
  http=inject(HttpClient);

  constructor() { }

  public getUserDetailById(id:any):Observable<IResultUserDetailsGet>{
    return this.http.get<IResultUserDetailsGet>(`${this.mainApi}/UserDetail/GetUserDetailById?userDetailId=${id}`,{});
  }

  setId(id:string){
    localStorage.setItem('userId',id);
    this.userId.next(id);
  }
  getId(){
    return  localStorage.getItem('userId');
  }
  removeId(){
    localStorage.setItem('userId',"");
    this.userId.next("");
  }
}
