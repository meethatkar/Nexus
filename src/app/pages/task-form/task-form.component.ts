import { Component } from '@angular/core';
import { project } from '../../models/project.model';
import { FormsModule, NgForm } from '@angular/forms';
import { task } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule,RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  // projectList:project=new project();
  managerProject : string[]= [];      //here list of name or alll detail of releated project will be stored
  taskObj:task = new task();

  assignTask(taskFormDate:NgForm){
    // localStorage.setItem("taskData",taskFormDate.value);
    // console.log(taskFormDate.value);
    console.log(this.taskObj);

  }
}
