import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TaskService} from './task.service';
import {Task} from './task';
import { NgForm } from '@angular/forms';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TaskService]
})
export class AppComponent {
  title ="User Name";
  positionName = "Operations Manager";
  list:any;
  timer: number;
  taskRes :any[]=[];
  userDuration: number =0;
  condition:boolean;
  taskList: boolean;
  startTask:boolean;
  roledetails: any=[];
  roleNames: any =[];
  taskdetails: any;
  taskNames:Task;
  selectedItem:any;
  index:number;
  roleIndex: number;
  customTask: any=[];

  today = Date.now();
  ticks = 0;  
  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;
  sub: Subscription;
  
  constructor(private router: Router,private http:Http, private taskService: TaskService) {
    this.list = [
       'Developer',
       'Team Lead'
    ];
    //Getting system user name
//    this.taskService.getUser().subscribe(data=>{
//      this.title = data;
//      console.log("title inside user:"+this.title)
//    })
//    this.taskService.getPositionRolesTasks().subscribe(data=>{
//      this.roleNames = data;
//      this.positionName = this.roleNames[0].PositionName;
//      console.log("details"+this.roleNames[0].RoleName);
//    })
//    //Getting list of roles
//     this.taskService.getRolesJSON().subscribe(data => {
//     this.roledetails = data;
//     console.log(this.roledetails);
//     });
//     this.condition = false;
//     this.taskList  = false;
//    // this.title = this.getUser();
//     this.startTask = true;
//     var obj;
//      /*this.taskService.getRolesJSON().subscribe(data => {
//        this.roledetails = data;*/
//     // this.roles();
//     // taskService.getUser();
//     // this.title = taskService.userName;
//   }
//   listClick(event, newValue) {
//     this.roleIndex = newValue.RoleID;
//     console.log(newValue.TaskID+"  i:"+this.roleIndex);
//     newValue.TaskDetails.length !=0 ? (this.taskList = false, this.taskdetails = newValue.TaskDetails) :(this.taskdetails =[], this.taskList = false)
//     console.log("cxzcz "+this.taskdetails.toString());
//     // for(var i=1; i<=newValue.TaskID.length; i++){
//     //   console.log(newValue.TaskID[i-1]);
//     //   this.taskdetails = this.taskService.getTasksJSON(newValue.TaskID[i-1]).subscribe(
//     //     data=>{
//     //     this.taskdetails = data as Task;
//     //     this.taskNames+=this.taskdetails;
//     //     console.log(this.taskNames);
//     //   });
//     // }
//     this.selectedItem = newValue;  // don't forget to update the model here
      
//     this.condition = true;    
//   }
//   // startTaskMethod(event,taskData){
//   //   console.log(taskData.taskName);
//   // }

//   start(event,taskData){
//     if(event != 0){  
//       this.index = event;    
//       this.taskRes = taskData;
//       console.log(taskData);
//     }else{
//       this.router.navigateByUrl('task');
//       console.log(this.taskRes);
//       let timer = Observable.timer(1, 1000);
//       this.sub = timer.subscribe(
//           t => {
//               this.ticks = t;
//               this.secondsDisplay = this.getSeconds(this.ticks);
//               this.minutesDisplay = this.getMinutes(this.ticks);
//               this.hoursDisplay = this.getHours(this.ticks);
//           }
//       );
//       this.startTask = false;   
//     }      
//     // this.router.navigateByUrl('/task');
//   }
//   private getSeconds(ticks: number) {
//     return this.pad(ticks % 60);
// }

// private getMinutes(ticks: number) {
//      return this.pad((Math.floor(ticks / 60)) % 60);
// }

// private getHours(ticks: number) {
//     return this.pad(Math.floor((ticks / 60) / 60));
// }

// private pad(digit: any) { 
//     return digit <= 9 ? '0' + digit : digit;
// }
   
//   // getUser(){
//   //   this.http.get('http://localhost:50714/api/values/1')
//   //    .map((data: Response)=>{
//   //      return data.json() as string;
//   //    }).toPromise().then(x=>{
//   //      this.title =x;
//   //    }).catch(this.handleError);
//   // }
//   getUser(): Observable<string> {
//     console.log('Calling getUser');
//     return this.http.get('http://localhost:50714/api/values/1')
//       .map((data: Response) =>{
//         return data.json() as string;
//       });
//   }
//   submit(task1, duration){
//     var result:boolean= false;
//     var x= task1, y;
//       x["UserDuration"] = duration;
//     this.timer = this.hoursDisplay + this.minutesDisplay + this.secondsDisplay;
//     x["SystemDuration"] = this.timer;
//     console.log(x);
//     for (var i = 0; i < this.roleNames.length; i++) {
//       if(this.roleNames[i].RoleID == this.roleIndex){
//         console.log(this.roleIndex+"index " +this.roleNames[i].RoleID);
//         y = this.roleNames[i];
//         console.log("role names:"+y);
//         y["TaskDetails"] = [x];
//         console.log("role names "+y);
//         var z = this.taskService.postTask(y).subscribe(data=>{
//           console.log(data);
//           result= true;
//           (result) ? ( alert("Successfully submitted the task details"),
//           this.taskdetails.splice(this.index-1,1),
//           console.log(this.taskdetails),
//           console.log("result:"+result),
//           this.startTask = true
//           ):(
//             console.log("result:"+result),
//               alert("Failed to submit task"),
//               this.startTask = false
//           )
//         })
//         console.log(z);
//       }
//     }
//     if(!result){
//       alert("Cannot update please try again");
//     }   
//   }

//   //Custom Task
//   customTaskSubmit(customData){
//     var x = customData;
//     console.log("customData: "+x);
//     x["RoleID"] = this.roleIndex;
//     console.log(x["RoleID"]);
//     this.taskService.postCustomTask(x).subscribe(data=>{
//       console.log(data);
//       alert("Successfully created custom task");
//     });
//     console.log("custom task"+x.description);
//   }
//  public handleError = (error: Response) => { 
//     // Do messaging and error handling here
//     return Observable.throw(error);
// }
  }
}
