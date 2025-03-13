import { IResultRelation } from './../../models/relation.model';
import { Component, inject, OnInit } from '@angular/core';
import { IResultProject, project } from '../../models/project.model';
import { task } from '../../models/task.model';
import { userDetails } from '../../models/userDetails.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  UserDetailServiceObj = inject(UserDetailService);
  UserSignupServiceObj = inject(UserSignupService);
  projectServiceObj = inject(ProjectService);
  AddMemberServiceObj = inject(AddMemberService);
  // role=this.UserDetailServiceObj.getUserRole();
  isLoading = false;
  token: any = this.UserSignupServiceObj.getToken();
  decoded: any = jwtDecode(this.token); // Decode JWT
  error: any = {};
  nonMemberUsers: any[] = [];


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

  selectedMember: string = '';

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

 

  closeDropdown() {
    this.expandedIndexMember = null;
  }
}
