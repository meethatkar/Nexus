export class project {
    // projectName:string;
    // memberCount:number;
    // taskCount:number;
    // completionPercent:number;
    // projectDescription:string;
    // projectStatus:string;
    // projectDuedate:Date;
    // pmanagerName:string;
    projectName: string[];
    memberCount: number[];
    taskCount: number[];
    completionPercent: number[];
    projectDescription: string[];
    projectStatus: string[];
    projectDuedate: Date[];
    pmanagerName: string[];
    constructor() {
        // this.projectName="",
        // this.memberCount=0;
        // this.taskCount=0;
        // this.completionPercent=0;
        // this.projectDescription="";
        // this.projectStatus="";
        // this.projectDuedate=new Date();
        // this.pmanagerName="";


        // this.projectName=[],
        // this.memberCount=[];
        // this.taskCount=[];
        // this.completionPercent=[];
        // this.projectDescription=[];
        // this.projectStatus=[];
        // this.projectDuedate=[];
        // this.pmanagerName=[];



        // Sample data generation for projects
        const startBase = new Date();
        this.projectName = ['Nexus Web', 'Task Tracker', 'CRM App', 'E-Commerce System', 'AI Chatbot', 'Finance Dashboard', 'HR Portal']; // Projects match task projects
        this.memberCount = [5, 8, 6, 10, 4, 7, 9];
        this.taskCount = [15, 20, 10, 18, 12, 14, 25];
        this.completionPercent = [40, 85, 20, 60, 90, 30, 75];
        this.projectDescription = [
            'A web-based project management tool.',
            'An app to track tasks and progress.',
            'CRM system for managing customers.',
            'E-commerce solution for online stores.',
            'AI chatbot to assist with queries.',
            'Finance dashboard for reporting.',
            'HR system to manage employees.'
        ];
        this.projectStatus = ['Active', 'Completed', 'Pending', 'Active', 'Completed', 'Pending', 'Active'];
        this.pmanagerName = ['John', 'Sophia', 'Mike', 'Sarah', 'Daniel', 'Olivia', 'James'];
        this.projectDuedate = [
            new Date(2025, 2, 10),  // March 1, 2025
            new Date(2025, 2, 18),  // March 3, 2025
            new Date(2025, 2, 23),  // March 5, 2025
            new Date(2025, 2, 30),  // March 7, 2025
            new Date(2025, 3, 8),   // March 9, 2025
            new Date(2025, 3, 17),
            new Date(2025, 3, 25)
        ];
    }
}

export interface IResultProject {

}