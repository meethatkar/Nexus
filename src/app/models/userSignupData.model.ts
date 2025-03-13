export class userSignupData{
    email:string;
    username:string;
    password:string;
    userId:number;
    constructor(){
        this.email="",
        this.username="",
        this.password="",
        this.userId=100;
    }
}


export interface IResultSignup{
    data:any,
    result:boolean,
    message:string,
    // token:string;
    error:{};
}