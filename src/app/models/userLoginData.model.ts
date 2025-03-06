export class UserLoginData{
        loginData:string;
        password:string;
        constructor(){
            this.loginData="",
            this.password=""
        }
    }
    
    
    export interface IResultLogin{
        data:any,
        result:boolean,
        message:string,
        // token:string;
        error:{};
    }