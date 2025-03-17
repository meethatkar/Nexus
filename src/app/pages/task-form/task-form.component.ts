import { userSignupData } from './../../models/userSignupData.model';
import { Component, inject, OnInit, } from '@angular/core';
import { project } from '../../models/project.model';
import { FormsModule, NgForm } from '@angular/forms';
import { IResultTask, task } from '../../models/task.model';
import {  RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { IResultSignup } from '../../models/userSignupData.model';
import { HttpClient } from '@angular/common/http';
import { AddMemberService } from '../../services/addmember/add-member.service';
import { IResultMember, member } from '../../models/member.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule,RouterLink, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  // projectList:project=new project();
  managerProject : string[]= [];      //here list of name or alll detail of releated project will be stored
  taskObj:task = new task();
  userSignupDataObj = new userSignupData();
  membersObj = new member();
  taskServiceObj = inject(TaskService);
  route=inject(ActivatedRoute)
  AddMemberServiceObj = inject(AddMemberService);
  router = inject(Router);
  error:any = {}
  selectedMember: member  = new member(); // Initialize to null
  routeData:any;
  prjId:number=0;
  minDate: string = '';  // To restrict past dates
  dateError: boolean = false;


  ngOnInit(): void {
    this.route.params.subscribe(routeData => {
          this.prjId=routeData['prjid'];
        })
        
        this.taskObj.projectId = this.prjId;

        console.log("PRoject id: "+this.prjId);
    
        this.AddMemberServiceObj.getMembersByPrjId(this.prjId).subscribe((res:IResultMember) => {
          if(res.result == true){
            this.membersObj.members = res.data;
            console.log(this.membersObj.members);
          }
          else{
            alert("result is false, check console");
            console.log(res.error);
          }
        }, (error) =>{
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
        })
  }

  assignTask(taskFormDate:NgForm){
    this.taskObj.userId = this.selectedMember.userId;
    this.taskObj.type = taskFormDate.value.taskType;
    this.taskServiceObj.assignTaskByProjectId(this.taskObj).subscribe((res:IResultTask) => {
      if(res.result == true){
        this.taskObj.tasks = res.data;
      alert("Task Assigned Successfully");
      this.router.navigate(['/projects']);
      }
      else{
        alert("Else block executed, see console for detail view");
        console.log(res.error);
      }
    }, (error) => {
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
    console.log(this.taskObj);
  }

    // Function to prevent selecting past dates
    setMinDate() {
      const today = new Date();
      this.minDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    }

      // Function to validate start and end date
  validateDates() {
    if (this.taskObj.startDate && this.taskObj.endtDate) {
      this.dateError = new Date(this.taskObj.startDate) > new Date(this.taskObj.endtDate);
    }
  }


}
