export class relation{
    userId?:number;
    projectId?:number;
    role?:string;
    relationId?:number;
}

export interface IResultRelation{
    result:boolean;
    message:string;
    data:any;
    error:{}
}