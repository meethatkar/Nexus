import { Component } from '@angular/core';
import { project } from '../../models/project.model';
import { task } from '../../models/task.model';
import { userDetails } from '../../models/userDetails.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent{
  expandedIndex: number | null = null;
  selectedProjectIndex: number | null = null;
  projectObj:project=new project();
  taskObj:task=new task();  
  userDetailsObj:userDetails=new userDetails(); 
  role="manager"

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  toggleTaskView(index: number) {
    this.selectedProjectIndex = this.selectedProjectIndex === index ? null : index;
  }
}
