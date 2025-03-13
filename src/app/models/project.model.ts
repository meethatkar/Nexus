export class project {
    projectName:string;
    memberCount:number;
    pmanagerIdGet?:number;
    taskCount:number;
    completionPercent:number;
    description:string;
    projectStatus:string;
    duedate:Date;
    statusId:number;


    projects: { 
        projectId: number; 
        projectName: string; 
        description: string; 
        dueDate:Date;
        statusId: number; 
        isActive: boolean; 
      }[];

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

    // projectNameGet: string[];
    // memberCountGet: number[];
    // taskCountGet: number[];
    // completionPercentGet: number[];
    // projectDescriptionGet: string[];
    // projectStatusGet: string[];
    // projectDuedateGet: Date[];
    // pmanagerNameGet: string[];
    // projectIdGet:number[];
    constructor() {
        this.projectName="",
        this.memberCount=0;
        this.taskCount=0;
        this.completionPercent=0;
        this.description="";
        this.projectStatus="";
        this.duedate=new Date();
        this.statusId=101;

        this.projects=[];

        // this.projectNameGet=[],
        // this.memberCountGet=[];
        // this.taskCountGet=[];
        // this.completionPercentGet=[];
        // this.projectDescriptionGet=[];
        // this.projectStatusGet=[];
        // this.projectDuedateGet=[];
        // this.pmanagerNameGet=[];
        // this.projectIdGet=[];
    }
    
    getStatus(statusId: number): string {
        for (let key in this.statusObj) {
            if (parseInt(key) === statusId) {
                return this.statusObj[key];
            }
        }
        return "Not Found"; // Default if not matched
    }
}

export interface IResultProject {
    result:boolean;
    message:string;
    data:any;
    error:{}
}