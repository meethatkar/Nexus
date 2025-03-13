import { relation } from './../../models/relation.model';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { userSignupData } from '../../models/userSignupData.model';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { UserSignupService } from '../signup/user-signup.service';
import { IResultRelation } from '../../models/relation.model';

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {

  private relationsUrl = 'http://localhost:5194/api/Relation/GetAllRelations';
  private usersUrl = 'http://localhost:5194/api/User/GetAllUsers';
  UserSignupServiceObj=inject(UserSignupService);
  token:any = this.UserSignupServiceObj.getToken();
  decoded: any = jwtDecode(this.token); // Decode JWT
  uid = this.decoded.UserId;
  

  constructor(private http: HttpClient) {}

  getNonMemberUsers(projectId: number): Observable<userSignupData[]> {
    return forkJoin({
      relations: this.http.get<any>(this.relationsUrl),
      users: this.http.get<any>(this.usersUrl)
    }).pipe(
      map(({ relations, users }) => {
        // Get userIds of Members in the specified project
        const memberUserIds = new Set(
          relations.data
            .filter((rel: any) => rel.role === 'Member' && rel.projectId === projectId)
            .map((rel: any) => rel.userId)
        );
  
        // Filter users who are NOT members of the project and NOT the logged-in user
        return users.data
          .filter((user: any) => !memberUserIds.has(user.userId) && user.userId != this.uid)
          .map((user: any) => ({
            userId: user.userId,
            username: user.username,
            email: user.email
          }));
      })
    );
  }


  addRelationApi(relationObj: relation): Observable<IResultRelation>{
    return this.http.post<IResultRelation>("http://localhost:5194/api/Relation/AddRelation",relationObj);
  }
  
 
}

