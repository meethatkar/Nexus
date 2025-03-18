import { ProjectService } from './../../services/project/project.service.';
import { Component, inject, OnInit } from '@angular/core';
import { IResultTask, task } from '../../models/task.model';
import { userDetails } from '../../models/userDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { member } from '../../models/member.model';
import { IResultProject, project } from '../../models/project.model';
import { jwtDecode } from 'jwt-decode';
import { UserSignupService } from '../../services/signup/user-signup.service';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AddMemberService } from '../../services/addmember/add-member.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  taskObj:task=new task();
  memberObj:member=new member();
  userDetailsObj:userDetails=new userDetails();
  projectObj = new project();
  projectServiceObj = inject(ProjectService);
  UserSignupServiceObj = inject(UserSignupService);
  taskServiceObj = inject(TaskService);
  route = inject(ActivatedRoute);
  memberServiceObj = inject(AddMemberService);
  isViewClicked:boolean=false;    //this is used to show task details div 
  selectedTask: any = null; // Stores the selected task
  // memberList:member=new member();
  selectedMember:number=0;
  seeYourTask:boolean = false;
  isLoading = false;
  error:any ={};
  routeData:any;
  prjId:number=0;
  token: any = this.UserSignupServiceObj.getToken();
  decoded: any = jwtDecode(this.token); // Decode JWT
  

  // METHODS PART
ngOnInit(): void {

  // this.route.params.subscribe(routeData => {
  //   this.prjId=routeData['prjid'];
  //   this.isViewClicked = routeData['status'];
  // })

   this.isLoading = true;
      this.projectServiceObj.getProjectByUserId(this.decoded.UserId).subscribe((res: IResultProject) => {
        this.isLoading = false;
        if (res.result == true) {
          this.projectObj.projects = res.data;
          console.log(this.projectObj.projects);
        }
        else {
          alert("Else block executed");
        }
      }, (error) => {
        this.isLoading = false;
        this.error = {};
        if (error.status === 400 || error.status === 401) {
          for (let key in error.error.error) {
            console.log(error.error.error[key]);
            this.error[key] = error.error.error[key];       //Store each error with its key
          }
        }
  
        else {
          alert("Unexpected error occured" + error.message);
        }
      }
      )
}
  
  //MEMBERS
  // Show task details
  // viewDetails(task: any,viewStatus:boolean) {
  //   this.isViewClicked=viewStatus;
  //   this.selectedTask = task;
  // }

  // Back to task list
  backToList() {
    this.isViewClicked = false;
    this.seeYourTask = false;
  }

  seeMyTask(status: boolean) {
  this.isViewClicked = status;
  this.isLoading = true;

  this.taskServiceObj.getTaskByUserId(this.decoded.UserId).subscribe((res: IResultTask) => {
    if (res.result) {
      this.taskObj.tasks = res.data;
      console.log("My tasks:", res.data);

      // Extract unique userIds from tasks
      const userIds = [...new Set(this.taskObj.tasks.map(task => task.userId))];

 // First API Call: Get projects by User ID
this.projectServiceObj.getProjectByUserId(this.decoded.UserId).subscribe((projectRes) => {
  if (projectRes.result) {
      this.projectObj.projects = projectRes.data;
      console.log("Project details:", this.projectObj.projects);

      // Map project names to tasks based on matching projectId
      this.taskObj.tasks.forEach(task => {
          const project = this.projectObj.projects.find(p => p.projectName === task.projectName);
          task.projectName = project ? project.projectName : "Unknown Project";
      });

      console.log("Updated tasks with project names:", this.taskObj.tasks);
  } else {
      console.log("No projects found for user.");
  }

  this.isLoading = false;
}, this.handleError);
    }
  });
}

// Common error handling method
handleError = (error: any) => {
  this.isLoading = false;
  this.error = error.status === 400 || error.status === 401 ? error.error.error : {};
  if (!Object.keys(this.error).length) alert("Unexpected error occurred: " + error.message);
};


  seeTask(prjid: number, viewStatus: boolean) {
    this.isViewClicked = viewStatus;
    this.prjId = prjid;
    this.isLoading = true;
  
    // Fetch tasks for the project
    this.taskServiceObj.getTaskByPrjId(this.prjId).subscribe((res: IResultTask) => {
      if (res.result == true) {
        console.log("sended data values: "+this.taskObj)
        this.taskObj.tasks = res.data;
        console.log("Tasks fetched:", this.taskObj.tasks);
        console.log("res.data is "+res.data);
  
        // Get unique userIds from tasks
        const userIds = [...new Set(this.taskObj.tasks.map(task => task.userId))];
  
        // Call APIs for project details and member details
        forkJoin({
          project: this.projectServiceObj.getProjectByUserId(this.decoded.UserId),
          members: this.memberServiceObj.getMembersByPrjId(this.prjId),
        }).subscribe(({ project, members }) => {
          
          // Store project and members data
          this.projectObj.projects = project.data;
          this.memberObj.members = members.data;
  
          console.log("Project details:", this.projectObj);
          console.log("Member details:", this.memberObj);
  
          // Map projectName and memberName to tasks
          this.taskObj.tasks.forEach(task => {
            const project = this.projectObj.projects.find(p => p.projectId === this.prjId);
            task.projectName = project ? project.projectName : "Unknown Project";
            const member = this.memberObj.members.find(m => m.userId === task.userId);
            task.memberName = member ? member.username : "Unknown";
          });
  
          console.log("Updated tasks with project & member names:", this.taskObj.tasks);
          this.isLoading = false;
  
        }, (error) => {
          console.error("Error fetching project/member details", error);
          this.isLoading = false;
        });
  
      } else {
        this.isLoading = false;
        alert("Else block executed, check console");
        console.log("Error: ", res.error);
      }
    }, (error) => {
      this.isLoading = false;
      this.error = {};
      if (error.status === 400 || error.status === 401) {
        for (let key in error.error.error) {
          console.log(error.error.error[key]);
          this.error[key] = error.error.error[key];
        }
      } else {
        alert("Unexpected error occurred: " + error.message);
      }
    });
  }
  

}
