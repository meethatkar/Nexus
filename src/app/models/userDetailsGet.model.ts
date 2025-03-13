export class userDetailsGet{
    firstName:string;
    lastName:string;
    phoneNo?:number;
    address:string;
    state:string;
    city:string;
    userId:number;
    // token:string;
    // role:string;
    email:string;
    username:string;
    password:string;
    age?:number;
    gender:string;
    constructor(){
        this.firstName="",
        this.lastName="",
        // this.phoneNo=0,
        this.address="",
        this.state="",
        this.city=""
        this.userId=0,
        // this.role="not assigned"
        // this.role="manager"
        // this.role="member"
        this.email=""
        this.username=""
        this.password=""
        // this.age=0
        this.gender="none"
    }
}
export interface IResultUserDetailsGet{
    result:boolean;
    message:string;
    data:any;
    error:{};
}