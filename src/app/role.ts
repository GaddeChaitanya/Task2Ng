import {Task} from './task';
export class Role {
    RoleID: number;
    RoleName: string;
    Description:string;
    TaskDetails:Task[]; 
    PositionID:number;
    PositionName: string;
}
