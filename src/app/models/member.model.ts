export class member{
    // memberId:number;
    // memberName:string;
    // memberStatus:string;
    memberId:number[];
    memberName:string[];
    memberStatus:string[];
    totalTask:number[];
    totalProject:number[];
    completedTask:number[];
    constructor(){
        // this.memberId=0;
        // this.memberName="";
        // this.memberStatus="";
        this.memberId=[101,102,103,104,105,106,107];
        this.memberName=['Kishor','Salman', 'Shahrukh', 'Amir', 'Saif', 'Kareena', 'Deepika'];
        this.memberStatus=['active','active','inactive','inactive','active','inactive','inactive'];
        this.totalTask=[10,11,10,19,17,15,14];
        this.totalProject=[2,3,4,7,6,3,5];
        this.completedTask=[3,7,4,10,9,15,9];

    }

    getCompletedTaskPercent(index:number):number{
        return (this.completedTask[index]/this.totalTask[index]*100);
    }
}

