export class userSignupData{
    email:string;
    username:string;
    password:string;
    constructor(){
        this.email="",
        this.username="",
        this.password=""
    }
}


export interface IResultSignup{
    data:any,
    result:boolean,
    message:string,
    // token:string;
    error:{};
}