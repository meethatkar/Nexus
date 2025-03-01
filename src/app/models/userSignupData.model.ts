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


export interface IResult{
    data:any,
    result:boolean,
    message:string,
}