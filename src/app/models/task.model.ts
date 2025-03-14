export class task {
    //          ************POST VARIABLES*****
    taskName:string;
    projectId:number;
    tmemberNamePost:string;
    type:string;
    priority:string;
    startDate:Date;
    endDate:Date;
    statusId:number = 101;
    description:string;
    tManagerNamePost:string;
    userId:number;
    tProjectName:string;

    tasks: {
        taskId: number;
        taskName: string;
        description: string;
        endDate: Date;
        statusId: number;
        isActive: boolean;
        type:string;
        priority:string;
        startDate: Date;
    }[];

    //  ******GET VARIABLES*****
    // taskNameGet: string[];
    // tprojectNameGet: string[];
    // tmemberNameGet: string[];
    // taskTypeGet: string[];
    // taskPriorityGet: string[];
    // startDateGet: Date[];
    // endDateGet: Date[];
    // taskStatusGet: string[];
    // taskDescriptionGet: string[];
    // tManagerNameGet: string[];
    // tMemberIdGet?:number[];
    constructor() {
        this.taskName="";
        // this.projectId=;
        this.tmemberNamePost="";
        this.type="";
        this.priority="";
        this.startDate=new Date();
        this.endDate=new Date();
        this.description="";
        this.tManagerNamePost="";
        this.projectId = 100;
        this.userId = 100;
        this.tProjectName = "";

        this.tasks=[];

        // this.tMemberIdPost=0


        // this.taskName=[],
        // this.tprojectName=[],
        // this.tmemberName=[],
        // this.taskType=[],
        // this.taskPriority=[],
        // this.startDate=[];
        // this.endDate=[];
        // this.taskStatus=[]
        // this.taskDescription=[];
        // this.tManagerName=[];

        // Sample data generation for tasks
        // this.taskNameGet = ['Design Homepage', 'Develop API', 'Fix Login Bug', 'Database Setup', 'UI Enhancements', 'Testing Phase', 'Deployment'];
        // this.tprojectNameGet = ['Nexus Web', 'Task Tracker', 'CRM App', 'E-Commerce System', 'AI Chatbot', 'Finance Dashboard', 'HR Portal'];
        // this.tmemberNameGet = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace'];
        // this.taskTypeGet = ['Feature', 'Bug', 'Improvement', 'Feature', 'Bug', 'Testing', 'Deployment'];
        // this.taskPriorityGet = ['High', 'Medium', 'High', 'Low', 'Medium', 'High', 'Critical'];
        // this.taskStatusGet = ['In Progress', 'Approved', 'Pending', 'Rejected', 'Approved', 'Pending', 'Rejected']; 
        //         //IN STATUS APPROVED = TASK FINISHED, PENDING = TASK IS SEND TO APPROVAL OR TASK IS REMANING TO START BY MEMBER, REJECTED = TASK REJECTED BY MANAGER, IN PROGRESS = MEMBER IS WORKING ON TASK  OR TASK IS  SEND FOR APPROVAL
        // this.taskDescriptionGet = [
        //     'Create homepage UI and layout',
        //     'Develop backend APIs for authentication',
        //     'Fix bug causing login failure',
        //     'Design and create database schema',
        //     'Enhance UI with animations',
        //     'Perform unit and integration testing',
        //     'Deploy application to production'
        // ];
        // this.startDateGet = [
        //     new Date(2025, 2, 1),  // March 1, 2025
        //     new Date(2025, 2, 6),  // March 3, 2025
        //     new Date(2025, 2, 12),  // March 5, 2025
        //     new Date(2025, 2, 20),  // March 7, 2025
        //     new Date(2025, 2, 25),   // March 9, 2025
        //     new Date(2025, 3, 1),
        //     new Date(2025, 3, 10)
        // ];
        // this.endDateGet = [
        //     new Date(2025, 2, 4),  // March 1, 2025
        //     new Date(2025, 2, 11),  // March 3, 2025
        //     new Date(2025, 2, 18),  // March 5, 2025
        //     new Date(2025, 2, 23),  // March 7, 2025
        //     new Date(2025, 2, 30),   // March 9, 2025
        //     new Date(2025, 3, 8),
        //     new Date(2025, 3, 17)
        // ];
        // this.tManagerNameGet = [ 'meet hatkar', 'amin khan', 'chandan mandal', 'nikhil pandey', 'dilip yadav',' shubham purkait', 'hero honda']
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