export class member{
    // memberId:number;
    // memberName:string;
    // memberStatus:string;
    memberId:number[];
    memberName:string[];
    memberStatus:string[];
    constructor(){
        // this.memberId=0;
        // this.memberName="";
        // this.memberStatus="";
        this.memberId=[101,102,103,104,105,106,107];
        this.memberName=['Alice','Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace'];
        this.memberStatus=['active','active','inactive','inactive','active','inactive','inactive'];
    }
}