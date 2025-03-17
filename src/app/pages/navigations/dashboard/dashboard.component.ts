import { UserDetailService } from './../../../services/getUser/user-detail.service';
import { task } from './../../../models/task.model';
import { AfterViewInit, Component, inject } from '@angular/core';
import { IResultProject, project } from '../../../models/project.model';
import { member } from '../../../models/member.model';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../loader/loader.component";
import { ProjectService } from '../../../services/project/project.service.';
import { UserSignupService } from '../../../services/signup/user-signup.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[UserDetailService]
})
export class DashboardComponent implements AfterViewInit{
  // role=localStorage.getItem('role')
  // role:String="member";
  projectObj:project = new project();
  taskObj:task = new task();
  memberObj:member=new member();
  completedTaskCount:number=0;
  inprogressTaskCount:number=0;
  rejectedTaskCount:number=0;
  userDetailService=inject(UserDetailService);
  UserSignupServiceObj = inject(UserSignupService);
  isLoading=false;
  projectServiceObj= new ProjectService();
  error:any={}
  token:any = this.UserSignupServiceObj.getToken();
  decoded: any = jwtDecode(this.token); // Decode JWT
  // role=this.userDetailService.getUserRole();

  //LOGIC FOR MANAGER'S DASHBOARD 
  totalProjects = 20;
  liveProject=5;
  completedProject=4;
  droppedProject=11;


  ngAfterViewInit() {
    // this.createProjectChart();
        this.isLoading=true;
        this.projectServiceObj.getProjectByUserId(this.decoded.UserId).subscribe((res:IResultProject)=>{
          this.isLoading=false;
          if(res.result==true){
            this.projectObj.projects = res.data;
            console.log(this.projectObj.projects);
          }
          else{
            this.isLoading=false;
            alert("Else block executed");
          }
        }, (error) => {
          this.isLoading=false;
          this.error = {};
          if (error.status === 400 || error.status === 401) {
            for (let key in error.error.error) {
              console.log(error.error.error[key]);
              this.error[key] = error.error.error[key];       //Store each error with its key
            }
          }
    
          else {
            alert("Unexpected error occured"+error.message);
          }
        }
    )
  }

  // createProjectChart() {
  //   new Chart("projectPieChart", {
  //     type: 'pie',
  //     data: {
  //       labels: ["Completed", "Live", "Pending/Dropped"],
  //       datasets: [{
  //         data: [this.completedProject,this.liveProject,this.droppedProject],
  //         backgroundColor: ["#28a745", "#007bff", "#dc3545"]
  //       }]
  //     },
  //     options: {
  //       responsive: true
  //     }
  //   });
  // }

  createProject() {
    alert("Create Project Clicked");
  }

  assignMember() {
    alert("Assign Member Clicked");
  }

  viewReports() {
    alert("View Reports Clicked");
  }

  //LOGIC FOR MEMBER'S DASHBOARAD

  deadlineTasks = this.taskObj.tasks
  .filter((task) => {
    const taskDueDate = new Date(task.endtDate);
    const today = new Date();

    // Calculate the date 3 days from today
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);

    // Include tasks that are overdue OR due within the next 3 days
    return taskDueDate < nextThreeDays;
  })
  .map((task) => ({
    taskName: task.taskName,
    projectName: this.taskObj.tProjectName,  // Ensure this field exists in `tasks`
    assignedMember: this.taskObj.tmemberNamePost, // Ensure this field exists in `tasks`
    taskType: task.type, // Mapped correctly
    priority: task.priority, // Mapped correctly
    status: task.statusId, // Mapped correctly
    description: task.description, // Mapped correctly
    startDate: task.startDate, // Mapped correctly
    endDate: task.endtDate, // Mapped correctly
    managerName: this.taskObj.tManagerNamePost, // Ensure this field exists in `tasks`
  }));


  announcements = [
    { message: 'New task assigned: Database Optimization' },
    { message: 'Your task UI Design has been approved' }
  ];

}
