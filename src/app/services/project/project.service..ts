import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResultProject, project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private storageKey = 'projectIds';
  // BehaviorSubject to track projectId changes
  private projectIdsSubject = new BehaviorSubject<number[]>(this.getProjectIds());
  // Observable for other components to subscribe to
  projectIds$ = this.projectIdsSubject.asObservable();
  
  mainApi="http://localhost:5194/api"

  private http=inject(HttpClient);
  

  constructor() { }

   public createProject(obj:project):Observable<IResultProject>{
      return this.http.post<IResultProject>(this.mainApi + "/Project/AddProject",obj);
    }


    // http://localhost:5194/api/Project/GetTaskSsByProjectId?projectId=101
    // http://localhost:5194/api/Project/GetMembersByProjectId?projectId=101


    public getProjectByUserId(id:any):Observable<IResultProject>{
      return this.http.get<IResultProject>(`${this.mainApi}/Relation/GetProjectsByUserId?userId=${id}`,
        {}
      )
    }

    public getMemberCountByProjectId(id:any):Observable<IResultProject>{
      return this.http.get<IResultProject>(`${this.mainApi}/Relation/GetMembersCountByProjectId?projectId=${id}`,
      {}
    )
    }

    public getTaskCountByProjectId(id:any):Observable<IResultProject>{
      return this.http.get<IResultProject>(`${this.mainApi}/Task/GetTasksCountByProjectId?projectId=${id}`,
        {}
      )
    }

    //    ******* ARRAY OF PROJECT ID *******
     // Get stored project IDs from localStorage
  private getProjectIds(): number[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Function to add a new project ID
  addProjectId(newId: number) {
    const projectIds = this.getProjectIds();

    // Prevent duplicate IDs
    if (!projectIds.includes(newId)) {
      projectIds.push(newId);
      localStorage.setItem(this.storageKey, JSON.stringify(projectIds));
      
      // Emit updated value
      this.projectIdsSubject.next(projectIds);
    }
  }

  // Function to remove a project ID (optional)
  removeProjectId(id: number) {
    let projectIds = this.getProjectIds();
    projectIds = projectIds.filter(pid => pid !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(projectIds));

    // Emit updated value
    this.projectIdsSubject.next(projectIds);
  }

}
