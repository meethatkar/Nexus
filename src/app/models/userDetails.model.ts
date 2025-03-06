import { SafeResourceUrl } from "@angular/platform-browser";

export class userDetails{
    firstName:string;
    lastName:string;
    phoneNo:number;
    address:string;
    state:string;
    city:string;
    // userId:number;
    // token:string;
    // role:string;
    constructor(){
        this.firstName="",
        this.lastName="",
        this.phoneNo=0,
        this.address="",
        this.state="",
        this.city=""
        // this.userId=0,
        // this.role="not assigned"
        // this.role="manager"
        // this.role="member"
    }
}
export interface IResultUserDetails{
    result:boolean;
    message:string;
    data:any;
    error:{};
}