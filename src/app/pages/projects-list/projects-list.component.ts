import { IResultRelation } from './../../models/relation.model';
import { Component, inject, OnInit } from '@angular/core';
import { IResultProject, project } from '../../models/project.model';
import { IResultTask, task } from '../../models/task.model';
import { userDetails } from '../../models/userDetails.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserDetailService } from '../../services/getUser/user-detail.service';
import { LoaderComponent } from "../loader/loader.component";
import { UserSignupService } from '../../services/signup/user-signup.service';
import { jwtDecode } from 'jwt-decode';
import { ProjectService } from '../../services/project/project.service.';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { FormsModule } from '@angular/forms';
import { AddMemberService } from '../../services/addmember/add-member.service';
import { userSignupData } from '../../models/userSignupData.model';
import { relation } from '../../models/relation.model';
import { TaskService } from '../../services/task/task.service';
import { member } from '../../models/member.model';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, RouterLink, LoaderComponent, FormsModule],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css',
  providers: [UserDetailService]
})
export class ProjectsListComponent implements OnInit {
  expandedIndexDetails: number | null = null;
  expandedIndexMember:number | null = null;
  selectedProjectIndex: number | null = null;
  projectObj: project = new project();
  taskObj: task = new task();
  userDetailsObj: userDetails = new userDetails();
  relationObj = new relation();
  memberObj = new member();
  UserDetailServiceObj = inject(UserDetailService);
  UserSignupServiceObj = inject(UserSignupService);
  projectServiceObj = inject(ProjectService);
  AddMemberServiceObj = inject(AddMemberService);
  router = inject(Router);
  taskServiceObj = inject(TaskService);
  // role=this.UserDetailServiceObj.getUserRole();
  isLoading = false;
  token: any = this.UserSignupServiceObj.getToken();
  decoded: any = jwtDecode(this.token); // Decode JWT
  error: any = {};
  nonMemberUsers: userSignupData[] = [] ;
  placeholderUser: userSignupData = { userId: 100, username: 'Select a member to add' , email: 'temp', password: 'temp'};
  selectedMember: userSignupData = this.placeholderUser;
  isTaskView:boolean = false;


  ngOnInit(): void {
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

  toggleDetails(index: number) {
    this.expandedIndexDetails = this.expandedIndexDetails === index ? null : index;
  }

  toggleTaskView(index: number) {
    this.selectedProjectIndex = this.selectedProjectIndex === index ? null : index;
  }

  getDetails(id: number) {
    this.isLoading = true
    // Fork API calls for each project to fetch Member Count & Task Count

    // Find the selected project
    let selectedProject = this.projectObj.projects.find((project: any) => project.projectId === id);

    if (!selectedProject) {
      console.error("Project not found!");
      return;
    }
    forkJoin({
      memberCount: this.projectServiceObj.getMemberCountByProjectId(id),
      taskCount: this.projectServiceObj.getTaskCountByProjectId(id)
    }).subscribe(
      ({ memberCount, taskCount }) => {

        // Find the clicked project and update its properties
        const selectedProject = this.projectObj.projects.find(project => project.projectId === id);
        if (selectedProject) {
          this.projectObj.memberCount = memberCount.data; // Assuming API returns count in `data`
          this.projectObj.taskCount = taskCount.data;
        }
        else {
          console.log(selectedProject)
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.error = {};
        if (error.status === 400 || error.status === 401) {
          for (let key in error.error.error) {
            console.log(error.error.error[key]);
            this.error[key] = error.error.error[key];       //Store each error with its key
          }
        }

        else {
          this.isLoading = false;
          alert("Unexpected error occured" + error.message);
        }
      }
    );
  }

  // projects = [
  //   { projectId: 1, projectName: 'prj 1', statusId: 1, dueDate: '2025-03-13' },
  //   { projectId: 2, projectName: 'prj 2', statusId: 1, dueDate: '2025-03-14' }
  // ];
  // nonMembers = ['User A', 'User B', 'User C']; // List of non-members


  toggleMemberDropdown(index: number, prjid: number) {
    this.AddMemberServiceObj.getNonMemberUsers(prjid).subscribe(
      (data) => {
        this.nonMemberUsers = data;
        console.log('Users who are NOT members:', this.nonMemberUsers);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.expandedIndexMember = this.expandedIndexMember === index ? null : index;

  }

 addRelation(prjId:number, userId:number){
  
  this.relationObj.projectId = prjId;
  this.relationObj.userId = userId;

  this.AddMemberServiceObj.addRelationApi(this.relationObj).subscribe((res:IResultRelation) => {
    if(res.result == true){
      this.relationObj = res.data;
      alert("User Added Successfully !!");
      console.log("Relation call result data: "+res.data);
    }
    else{
      alert("Else block executed, result is false, check console");
      console.log("Else block error: "+res.error);
    }
  }, (error) => {
    this.error = {};
    if (error.status === 400) {
      for (let key in error.error.error) {
        console.log(error.error.error[key]);
        this.error[key] = error.error.error[key];         //Store each error with its key
      }
    }
    else {
      alert("Unexpected error occured " + error.message);
    }
  }
)

  if (this.selectedMember) {
    this.expandedIndexMember = null;
  }
 }

  closeDropdown() {
    this.expandedIndexMember = null;
  }

  seeMemberDetails(prjId:number){
    this.router.navigate(['/memberlist',prjId]);
  }

  seeTaskDetails(prjid:number){
    // this.router.navigate(['/tasks', true, prjid])
    this.isTaskView = true;
    this.isLoading = true;
    this.taskServiceObj.getTaskByPrjId(prjid).subscribe((res: IResultTask) => {
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
              members: this.AddMemberServiceObj.getMembersByPrjId(prjid),
            }).subscribe(({ project, members }) => {
              
              // Store project and members data
              this.projectObj.projects = project.data;
              this.memberObj.members = members.data;
      
              console.log("Project details:", this.projectObj);
              console.log("Member details:", this.memberObj);
      
              // Map projectName and memberName to tasks
              this.taskObj.tasks.forEach(task => {
                const project = this.projectObj.projects.find(p => p.projectId === prjid);
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

  assignTask(prjid:number){
    this.router.navigate(['/assigntask',prjid]);
  }

  backToList(){
    this.isTaskView = false;
  }

}
