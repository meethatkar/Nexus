import { Component } from '@angular/core';
import { task } from '../../models/task.model';
import { userDetails } from '../../models/userDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { member } from '../../models/member.model';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  taskObj:task=new task();
  memberObj:member=new member();
  isViewClicked:boolean=false;    //this is used to show task details div 
  selectedTask: any = null; // Stores the selected task
  userDetailsObj:userDetails=new userDetails();
  // memberList:member=new member();
  selectedMember:number=0;
  role="manager";
  seeYourTask:boolean = false;
  

  // METHODS PART
  //MEMBERS
  // Show task details
  viewDetails(task: any,viewStatus:boolean) {
    this.isViewClicked=viewStatus;
    this.selectedTask = task;
  }

  // Back to task list
  backToList() {
    this.isViewClicked = false;
    this.seeYourTask = false;
  }

  //MANAGERS
  viewDetailTaskManager(viewStatus:boolean, memID:number){
    this.isViewClicked=viewStatus;
    this.selectedMember=memID;
  }

  seeMyTask(status:boolean){
    this.seeYourTask = status;
  }



}
