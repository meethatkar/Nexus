import { UserSignupService } from './../../services/signup/user-signup.service';
import { UserDetailService } from './../../services/getUser/user-detail.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { userDetails } from '../../models/userDetails.model';
import { IResultProject, project } from '../../models/project.model';
import { IResultUserDetailsGet } from '../../models/userDetailsGet.model';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project/project.service.';
import { forkJoin } from 'rxjs';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [UserDetailService]
})
export class HomeComponent implements OnInit {
  userDetailsObj: userDetails = new userDetails();
  UserSignupServiceObj = inject(UserSignupService);
  userDetailService = inject(UserDetailService);
  projectServiceObj = inject(ProjectService);
  userSignupService = inject(UserSignupService);
  userDetailsGetObj = new userDetails();
  error: any = {}
  porjectObj = new project();
  isLogin: any = ""; isLoading = false;
  // role=this.userDetailService.getUserRole();

  projectObj = new project();
  token: any = this.UserSignupServiceObj.getToken();
  decoded: any = "";

  ngOnInit(): void {

    // Subscribe to authStatus$ to detect login/logout changes
    this.userSignupService.authStatus$.subscribe(status => {
      this.isLogin = status;
    });

    if (this.isLogin) {
      this.isLoading = true;
      if (this.token != "") {
        this.decoded = jwtDecode(this.token); // Decode JWT
      }
      forkJoin({
        userDetails: this.userDetailService.getUserDetailById(this.decoded.UserId),
        projectDetails: this.projectServiceObj.getProjectByUserId(this.decoded.UserId)
      }).subscribe(
        ({ userDetails, projectDetails }) => {
          if (userDetails.result) {
            this.userDetailsGetObj = userDetails.data;
            console.log(this.userDetailsGetObj, "my account section (userDetailsObj)");
            this.isLoading = false;
          } else {
            this.isLoading = false;
            alert("User details fetch failed.");
          }

          if (projectDetails.result) {
            this.projectObj.projects = projectDetails.data;
            this.isLoading = false;
            console.log(this.projectObj.projects);
          } else {
            this.isLoading = false;
            alert("Else block executed for project details.");
          }
        },
        (error) => {
          this.error = {};
          this.isLoading = false;
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
      );

    }
  }

}

