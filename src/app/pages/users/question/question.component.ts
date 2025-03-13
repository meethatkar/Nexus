import { FormsModule, NgForm } from '@angular/forms';
import { UserDetailService } from './../../../services/getUser/user-detail.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { project } from '../../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

//          ************** QUESTION PART **************
UserDetailServiceObj = inject(UserDetailService);
// isManager:boolean=false;
// isMember:boolean=false;

  //methods
  assignRole(r:string){
    // this.UserDetailServiceObj.setUserRole(r);
  }

  


  //        ********JOIN PROJECT CODE************
  router=inject(Router);
  passwordVisible: boolean = false;
  projectObj:project = new project();     //this will be used for real validation.

  onJoin(joinProjectData: NgForm) {
    const projectString = localStorage.getItem('project');

    // if (!projectString) {
    //     console.error("No project data found in localStorage.");
    //     alert("No project data found.");
    //     return;
    // }

    try {
        alert("Project Joined ");
        this.router.navigate(['/home']);
        //         const prjData = JSON.parse(projectString);
        //         console.log("Parsed project data:", prjData);
        // if (prjData.userPassword === joinProjectData.value.userPassword &&
        //     joinProjectData.value.projectId === this.projectList.projects[1].id) {
        //     alert("Project joined successfully");
        //     this.authService.setUserRole("member");
        //     this.router.navigate(['/home']);
        // } else {
        //     alert("Invalid credentials");
        // }
    } catch (error) {
        console.log("Error parsing project data:", error);
        alert("Stored project data is corrupted. Please create a new project.");
    }
}



  togglePassword(): void {
    this.passwordVisible=!this.passwordVisible;
  }


  //        ********** CREATE PROJECT CODE **********


  onCreate(createProjectData:NgForm){
    // let lastPrjId:number = (this.projectObj.projectIdGet.length)-1;

    // this.projectObj.projectNameGet.push(createProjectData.value.projectName);
    // this.projectObj.projectDescriptionGet.push(createProjectData.value.description);
    // this.projectObj.projectDuedateGet.push(createProjectData.value.deadLine);
    // console.log(lastPrjId+" is last project id");
    this.router.navigate(['/home']);
  }

}
