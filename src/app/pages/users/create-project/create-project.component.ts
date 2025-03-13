import { IResultProject } from './../../../models/project.model';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project/project.service.';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-create-project',
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  router=inject(Router);
  projectObj:project = new project();
  projectServiceObj=inject(ProjectService)
  error:any={};
  isLoading=false;

    // Check if error object is empty
    isErrorNotEmpty(): boolean {
      return this.error && Object.keys(this.error).length > 0;
    }

  onCreate(createProjectData:NgForm){
    this.isLoading = true;
    this.projectServiceObj.createProject(this.projectObj).subscribe((res:IResultProject)=> {
      if(res.result==true){
        this.isLoading = false;
        alert("project Created Successfully ");
        this.projectServiceObj.addProjectId(res.data.projectId);    //ADDING PRJ ID IN LOCAL STORAGE.
        console.log("prj ID: "+(res.data.projectId));
        this.error={};
        this.router.navigate(['/home']);
      }
      else{
        this.isLoading = false;
        alert("Else block executed");
      }
    }, (error) => {
      this.isLoading = false;
      this.error = {};
      if (error.status === 400) {
        for (let key in error.error.error) {
          this.error[key] = error.error.error[key];       //Store each error with its key
        }
      }
      else if(error.status === 401){
        this.error={"Unauthorized ":" Unauthorized error executed "};
      }
      else {
        alert("Unexpected error occured"+error.message);
      }
    })
  }
}
