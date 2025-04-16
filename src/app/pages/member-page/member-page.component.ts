import { IResultProject } from './../../models/project.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { member } from '../../models/member.model';
import { AddMemberService } from '../../services/addmember/add-member.service';
import { UserDetailService } from '../../services/getUser/user-detail.service';
import { forkJoin } from 'rxjs';
import { IResultUserDetails, userDetails } from '../../models/userDetails.model';
import { UserSignupService } from '../../services/signup/user-signup.service';
import { jwtDecode } from 'jwt-decode';
import { project } from '../../models/project.model';
import { ProjectService } from '../../services/project/project.service.';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberListComponent implements OnInit {

  memberObj = new member();
  projectObj = new project();
  userDetailList: userDetails[] = []; // Store user details of all members
  men_img_loc:string[] = ["assets/member_img/profile_men_2.jpg","assets/member_img/proflie_men_1.jpg","assets/member_img/proflie_men_3.jpg"];
  women_img_loc:string[] = ["assets/member_img/profile_women_2.jpg","assets/member_img/profile_women_2.jpg","assets/member_img/profile_women_2.jpg"];
  randomNum?:number;
  isLoading:boolean=false;


  memberServiceObj = inject(AddMemberService);
  userServiceObj = inject(UserDetailService);
  userSignupServiceObj = inject(UserSignupService);
  projectServiceObj = inject(ProjectService);

  token: any = this.userSignupServiceObj.getToken();
  decoded: any = jwtDecode(this.token); // Decode JWT
  error: any = {};

  ngOnInit(): void {
    this.getProjectMembersAndUserDetails();
  }

  /** ✅ Fetch Projects by User ID and then get Members & User Details */
  getProjectMembersAndUserDetails() {
    this.isLoading=true;
    this.projectServiceObj.getProjectByUserId(this.decoded.UserId).subscribe({
      next: (res: IResultProject) => {
        if (res.result) {
          this.projectObj.projects = res.data;
          console.log("Projects fetched successfully:", this.projectObj.projects);

          // **Collect all project IDs to fetch members**
          const projectIds = this.projectObj.projects.map(project => project.projectId);

          // **Fetch members for each project using forkJoin**
          forkJoin(projectIds.map(prjId => this.memberServiceObj.getMembersByPrjId(prjId)))
            .subscribe({
              next: (memberResponses) => {
                this.memberObj.members = memberResponses
                  .filter(res => res.result)
                  .flatMap(res => res.data);

                console.log("Members fetched successfully:", this.memberObj.members);

                // **Now fetch user details for all members**
                this.getUserDetailsForMembers();
                this.isLoading=false;
              },
              error: this.handleError
            });
        } else {
          console.log("No projects found for this user.");
        }
      },
      error: this.handleError
    });
  }

  /** ✅ Fetch User Details for All Members */
  getUserDetailsForMembers() {
    if (this.memberObj.members.length === 0) {
      console.log("No members available to fetch user details.");
      return;
    }
    const filteredMembers = this.memberObj.members.filter(member => member.userId != this.decoded.UserId);

    // **Fetch user details for each member in parallel**
    forkJoin(filteredMembers.map(member => 
      this.userServiceObj.getUserDetailById(member.userId)
    )).subscribe({
      next: (userResponses) => {
        this.userDetailList = userResponses
          .filter(res => res.result)
          .map(res => res.data);

        console.log("User details fetched successfully:", this.userDetailList);
      },
      error: this.handleError
    });
  }

  /** ✅ Centralized Error Handling */
  handleError(error: any): void {
    this.isLoading=false;
    console.error("An error occurred:", error);
    this.error = {};

    if (error.status === 400 || error.status === 401) {
      for (let key in error.error) {
        console.log(error.error[key]);
        this.error[key] = error.error[key]; // Store each error with its key
      }
      alert(JSON.stringify(this.error));
    } else {
      alert("Unexpected error occurred: " + error.message);
    }
  }

  generateRandomNumber():number{
    this.randomNum= Math.floor(Math.random()*3);
    return this.randomNum
  }
}
