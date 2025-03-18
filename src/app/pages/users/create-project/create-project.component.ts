import { IResultProject } from './../../../models/project.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class CreateProjectComponent implements OnInit{
  router=inject(Router);
  projectObj:project = new project();
  projectServiceObj=inject(ProjectService)
  error:any={};
  isLoading=false;
  minDueDate:string = "";

    // Check if error object is empty
    isErrorNotEmpty(): boolean {
      return this.error && Object.keys(this.error).length > 0;
    }

    ngOnInit(): void {
      this.setMinDueDate();
      // this.validateDates();
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

// Function to set the minimum due date (10 days after today)
setMinDueDate() {
  const today = new Date();
  today.setDate(today.getDate() + 10); // Add 10 days

  const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure two digits
  const year = today.getFullYear();

  this.minDueDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD for input[type="date"]
}

// Function to validate start and due date
validateDates() {
  if (!this.projectObj.duedate) return; // Skip validation if no due date is set

  const dueDateObj = new Date(this.projectObj.duedate);
  const minDueDateObj = new Date(this.minDueDate); // 10 days after today

  if (dueDateObj < minDueDateObj) {
    alert("Due date must be at least 10 days after today!");
    this.projectObj.duedate = new Date(Date.parse(this.minDueDate)); // Reset to minimum valid date
  }
}


}
