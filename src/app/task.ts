export class Task {
    TaskID:number;
    TaskName: string;
    Description:string;
    UserDuration:string;
    SystemDuration: string;
    constructor(TaskID:number, TaskName: string, Description:string,UserDuration:string,SystemDuration: string){
        this.TaskID = TaskID;
        this.TaskName = TaskName;
        this.Description = Description;
        this.UserDuration = UserDuration;
        this.SystemDuration = SystemDuration;
    }
}
