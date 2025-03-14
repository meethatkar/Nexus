export class member{

    userId:number;
    email:string;
    username:string;
    // joinedDate:Date;
    // isActive:boolean;
    // createdBy:number;

    members: {
        userId:number;
        email:string;
        username:string;
        joinedDate:Date;
        isActive:boolean;
        createdBy:number;    
    }[];
    constructor(){
        this.userId=0;
        this.email="";
        this.username=""
        // this.joinedDate=new Date();
        // this.isActive=false;
        // this.createdBy=100;

        this.members=[];
    }
}

export interface IResultMember{
    result:boolean;
    message:string;
    data:any;
    error:{}
}

