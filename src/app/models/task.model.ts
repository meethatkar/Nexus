export class task {
    //          ************POST VARIABLES*****
    taskNamePost:string;
    tprojectNamePost:string;
    tmemberNamePost:string;
    taskTypePost:string;
    taskPriorityPost:string;
    startDatePost:Date;
    endDatePost:Date;
    taskStatusPost:string;
    taskDescriptionPost:string;
    tManagerNamePost:string;
    tMemberIdPost?:number;

    //  ******GET VARIABLES*****
    taskNameGet: string[];
    tprojectNameGet: string[];
    tmemberNameGet: string[];
    taskTypeGet: string[];
    taskPriorityGet: string[];
    startDateGet: Date[];
    endDateGet: Date[];
    taskStatusGet: string[];
    taskDescriptionGet: string[];
    tManagerNameGet: string[];
    tMemberIdGet?:number[];
    constructor() {
        this.taskNamePost="",
        this.tprojectNamePost="",
        this.tmemberNamePost="",
        this.taskTypePost="",
        this.taskPriorityPost="",
        this.startDatePost=new Date();
        this.endDatePost=new Date();
        this.taskStatusPost="",
        this.taskDescriptionPost="",
        this.tManagerNamePost="",
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
        this.taskNameGet = ['Design Homepage', 'Develop API', 'Fix Login Bug', 'Database Setup', 'UI Enhancements', 'Testing Phase', 'Deployment'];
        this.tprojectNameGet = ['Nexus Web', 'Task Tracker', 'CRM App', 'E-Commerce System', 'AI Chatbot', 'Finance Dashboard', 'HR Portal'];
        this.tmemberNameGet = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace'];
        this.taskTypeGet = ['Feature', 'Bug', 'Improvement', 'Feature', 'Bug', 'Testing', 'Deployment'];
        this.taskPriorityGet = ['High', 'Medium', 'High', 'Low', 'Medium', 'High', 'Critical'];
        this.taskStatusGet = ['In Progress', 'Completed', 'Not Started', 'In Progress', 'Completed', 'Not Started', 'In Progress'];
        this.taskDescriptionGet = [
            'Create homepage UI and layout',
            'Develop backend APIs for authentication',
            'Fix bug causing login failure',
            'Design and create database schema',
            'Enhance UI with animations',
            'Perform unit and integration testing',
            'Deploy application to production'
        ];
        this.startDateGet = [
            new Date(2025, 2, 1),  // March 1, 2025
            new Date(2025, 2, 6),  // March 3, 2025
            new Date(2025, 2, 12),  // March 5, 2025
            new Date(2025, 2, 20),  // March 7, 2025
            new Date(2025, 2, 25),   // March 9, 2025
            new Date(2025, 3, 1),
            new Date(2025, 3, 10)
        ];
        this.endDateGet = [
            new Date(2025, 2, 4),  // March 1, 2025
            new Date(2025, 2, 11),  // March 3, 2025
            new Date(2025, 2, 18),  // March 5, 2025
            new Date(2025, 2, 23),  // March 7, 2025
            new Date(2025, 2, 30),   // March 9, 2025
            new Date(2025, 3, 8),
            new Date(2025, 3, 17)
        ];
        this.tManagerNameGet = [ 'meet hatkar', 'amin khan', 'chandan mandal', 'nikhil pandey', 'dilip yadav',' shubham purkait', 'hero honda']
    }
}

export interface IResultTask {

}