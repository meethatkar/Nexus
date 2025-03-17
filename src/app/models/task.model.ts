export class task {
    //          ************POST VARIABLES*****
    taskName:string;
    projectId:number;
    tmemberNamePost:string;
    type:string;
    priority:string;
    startDate:Date;
    endtDate:Date;
    statusId:number = 101;
    description:string;
    tManagerNamePost:string;
    userId:number;
    tProjectName:string;

    tasks: {
        taskId: number;
        taskName: string;
        description: string;
        endtDate: Date;
        statusId: number;
        userId:number;
        isActive: boolean;
        type:string;
        priority:string;
        startDate: Date;
        memberName: string;
        projectName: string;
    }[];
    
    constructor() {
        this.taskName="";
        // this.projectId=;
        this.tmemberNamePost="";
        this.type="";
        this.priority="";
        this.startDate=new Date();
        this.endtDate=new Date();
        this.description="";
        this.tManagerNamePost="";
        this.projectId = 100;
        this.userId = 100;
        this.tProjectName = "";

        this.tasks=[];

        // this.tMemberIdPost=0
    }

    statusObj: any = {
        "101": "New",
        "102": "Active",
        "103": "Blocked",
        "104": "Review",
        "105": "Completed",
        "106": "Approved",
        "107": "Resolved",
        "108": "QA"
    };

    getStatus(statusId: number): string {
        for (let key in this.statusObj) {
            if (parseInt(key) === statusId) {
                return this.statusObj[key];
            }
        }
        return "Not Found"; // Default if not matched
    }

}

export interface IResultTask {

    result : boolean;
    message: string;
    data: any;
    error: {};
}