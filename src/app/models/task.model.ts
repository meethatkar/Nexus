export class task {
    // taskName:string;
    // tprojectName:string;
    // tmemberName:string;
    // taskType:string;
    // taskPriority:string;
    // startDate:Date;
    // endDate:Date;
    // taskStatus:string;
    // taskDescription:string;
    taskName: string[];
    tprojectName: string[];
    tmemberName: string[];
    taskType: string[];
    taskPriority: string[];
    startDate: Date[];
    endDate: Date[];
    taskStatus: string[];
    taskDescription: string[];
    tManagerName: string[];
    constructor() {
        // this.taskName="",
        // this.tprojectName="",
        // this.tmemberName="",
        // this.taskType="",
        // this.taskPriority="",
        // this.startDate=new Date();
        // this.endDate=new Date();
        // this.taskStatus="",
        // this.taskDescription="",
        // this.tManagerName="",


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
        this.taskName = ['Design Homepage', 'Develop API', 'Fix Login Bug', 'Database Setup', 'UI Enhancements', 'Testing Phase', 'Deployment'];
        this.tprojectName = ['Nexus Web', 'Task Tracker', 'CRM App', 'E-Commerce System', 'AI Chatbot', 'Finance Dashboard', 'HR Portal'];
        this.tmemberName = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace'];
        this.taskType = ['Feature', 'Bug', 'Improvement', 'Feature', 'Bug', 'Testing', 'Deployment'];
        this.taskPriority = ['High', 'Medium', 'High', 'Low', 'Medium', 'High', 'Critical'];
        this.taskStatus = ['In Progress', 'Completed', 'Not Started', 'In Progress', 'Completed', 'Not Started', 'In Progress'];
        this.taskDescription = [
            'Create homepage UI and layout',
            'Develop backend APIs for authentication',
            'Fix bug causing login failure',
            'Design and create database schema',
            'Enhance UI with animations',
            'Perform unit and integration testing',
            'Deploy application to production'
        ];
        this.startDate = [
            new Date(2025, 2, 1),  // March 1, 2025
            new Date(2025, 2, 6),  // March 3, 2025
            new Date(2025, 2, 12),  // March 5, 2025
            new Date(2025, 2, 20),  // March 7, 2025
            new Date(2025, 2, 25),   // March 9, 2025
            new Date(2025, 3, 1),
            new Date(2025, 3, 10)
        ];
        this.endDate = [
            new Date(2025, 2, 4),  // March 1, 2025
            new Date(2025, 2, 11),  // March 3, 2025
            new Date(2025, 2, 18),  // March 5, 2025
            new Date(2025, 2, 23),  // March 7, 2025
            new Date(2025, 2, 30),   // March 9, 2025
            new Date(2025, 3, 8),
            new Date(2025, 3, 17)
        ];
        this.tManagerName = [ 'meet hatkar', 'amin khan', 'chandan mandal', 'nikhil pandey', 'dilip yadav',' shubham purkait', 'hero honda']
    }
}

export interface IResultTask {

}