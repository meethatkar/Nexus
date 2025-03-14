import { AddMemberService } from './../../../services/addmember/add-member.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResultMember, member } from '../../../models/member.model';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-member-list',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{

  route=inject(ActivatedRoute)
  prjId:number=100;
  AddMemberServiceObj = inject(AddMemberService);
  membersObj = new member();
  error:any={};
  isLoading=false;

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(routeData => {
      this.prjId=routeData['prjid'];
    })

    this.AddMemberServiceObj.getMembersByPrjId(this.prjId).subscribe((res:IResultMember) => {
      this.isLoading = false;
      if(res.result == true){
        this.membersObj.members = res.data;
        console.log(this.membersObj.members);
      }
      else{
        alert("result is false, check console");
        console.log(res.error);
      }
    }, (error) =>{
      this.isLoading = false;
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

}
