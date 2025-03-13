import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-list',
  imports: [CommonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  members= [
    { name: 'Bhoomi Shah', age: 22, gender: 'female', skills: 'Database designer, Backend Development', tasksCompleted: 24 },
    { name: 'Diya Gupta', age: 26, gender: 'female', skills: 'UI/UX Designer, Frontend Developer', tasksCompleted: 17 },
    { name: 'Rahul Verma', age: 28, gender: 'male', skills: 'Full Stack Developer, Testing', tasksCompleted: 30 },
    { name: 'Aryan Mehta', age: 25, gender: 'male', skills: 'DevOps, Cloud Computing', tasksCompleted: 21 }
  ];
}
