import { Component } from '@angular/core';
import { task } from '../../models/task.model';
import { userDetails } from '../../models/userDetails.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  taskObj:task=new task();
  isViewClicked:boolean=false;    //this is used to show task details div 
  selectedTask: number = null; // Stores the selected task
  userDetailsObj:userDetails=new userDetails();
  // memberList:member=new member();
  selectedMember:number=0;

  // METHODS PART
  //MEMBERS
  // Show task details
  viewDetails(task: number,viewStatus:boolean) {
    this.isViewClicked=viewStatus;
    this.selectedTask = task;
  }

  // Back to task list
  backToList() {
    this.isViewClicked = false;
  }

  //MANAGERS
  viewDetailTaskManager(viewStatus:boolean, memID:number){
    this.isViewClicked=viewStatus;
    this.selectedMember=memID;
  }

}
