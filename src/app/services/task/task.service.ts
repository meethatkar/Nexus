import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResultSignup } from '../../models/userSignupData.model';
import { HttpClient } from '@angular/common/http';
import { IResultTask, task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  assignTaskApi = "http://localhost:5194/api/Task/AddTask"
  http = inject(HttpClient);

  constructor() { }

  assignTaskByProjectId(taskObj:task): Observable<IResultTask>{
    return this.http.post<IResultTask>(this.assignTaskApi,taskObj);
  }
}
