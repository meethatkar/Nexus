import { SafeResourceUrl } from "@angular/platform-browser";

export class userDetails{
    firstName:string;
    lastName:string;
    phoneNumber?:number;
    address:string;
    state:string;
    city:string;
    userId:number;
    // token:string;
    role:string;
    constructor(){
        this.firstName="",
        this.lastName="",
        // this.phoneNumber=0,
        this.address="",
        this.state="",
        this.city="",
        this.userId=0,
        // this.token="xyz"
        // this.token=""
        this.role="not assigned"
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