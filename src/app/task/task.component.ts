import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TaskService} from '../task.service';
import {Task} from '../task';
import { NgForm } from '@angular/forms';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers:[TaskService]
})
export class TaskComponent implements OnInit {
  title ="User Name";
  roleNames: any =[];
  taskdetails: any;
  selectedItem:any;
  playStop:boolean;
  stop:boolean= true;
  taskRes :any[]=[];
  now:string='000000';
  currentTime;
  taskSubmit: any=[];
  maxTaskID: number;
  taskbuttondisabled: boolean = false;
  custtaskdisabled: boolean = false;

  constructor(private router: Router,private http:Http, private taskService: TaskService) {
    this.playStop = false;
    setInterval(()=>{
      this.currentTime = new Date(Date.now());
    }, 1000);
    this.taskService.getUser().subscribe(data=>{
      this.title = data;
      if(this.title=="Un Authorized user")
      console.log("title inside user:"+this.title);
      else{
        this.taskService.getPositionRolesTasks().subscribe(data=>{
          this.roleNames = data;
          console.log("details"+this.roleNames[0].RoleName);
          this.selectedItem = this.roleNames[0];
          this.taskdetails = this.roleNames[0].TaskDetails;
          if(this.roleNames[0].TaskDetails.length>0){
            this.taskdetails.forEach(element => {
                element.RoleID = this.roleNames[0].RoleID;
                console.log("xcvcx"+element.TaskDetails);
            });   
          }
          else
            this.taskdetails ="";
        });
      }
    });    
  }

  ngOnInit() {
  }

  listClick(event, newValue) {
    newValue.TaskDetails.length !=0 ? (this.taskdetails = newValue.TaskDetails, this.taskdetails["RoleID"]= newValue.RoleID, this.taskdetails["status"]=false,  this.taskdetails["startTime"]="") :(this.taskdetails =[])
    console.log("cxzcz "+this.taskdetails.toString());
    this.selectedItem = newValue;  // don't forget to update the model here   
  }
  start(event,taskData, state,index){

    var result:boolean= false;
    var x= [], y=[];
    if(event>0){
      if(!state){     
        this.taskdetails.forEach(element => {
          if(element == taskData){
            element.status = true;
            element.startTime = new Date(Date.now());
            element.RoleID = this.selectedItem.RoleID;
          }
        });        
      }else{
        this.playStop =true;        
        // this.taskdetails.splice(event-1,1);
      }
    }else{
      x["TaskID"]= taskData.TaskID;
      x["TaskName"] = taskData.TaskName;
      x["Description"] = taskData.Description;
      x["UserDuration"] = taskData.enteredDuration;
      console.log(taskData.startTime);
      let date1: string = new Date(Date.now()).toString();
      let date2: string =taskData.startTime;
      
      let diffInMs: number = Date.parse(date1) - Date.parse(date2);
      let diffInMinutes: number = diffInMs / 1000 / 60;
      
      console.log(diffInMinutes);
      x["SystemDuration"] = diffInMinutes;
      // x["SystemDuration"] =  new Date().getTime() - new Date(taskData.startTime).getTime();
      console.log("duratio"+ date1+" sdvsd"+ date2+ "dufre"+diffInMs);
      console.log("sffd"+x);
      //   x["UserDuration"] = duration;
      // this.timer = this.hoursDisplay + this.minutesDisplay + this.secondsDisplay;
      // x["SystemDuration"] = this.timer;
      for (var i = 0; i < this.roleNames.length; i++) {
        if(this.roleNames[i].RoleID == taskData.RoleID){
          y["RoleID"]= this.roleNames[i].RoleID;
          y["RoleName"] = this.roleNames[i].RoleName;
          y["Description"] = this.roleNames[i].Description;
          y["PositionID"] = this.roleNames[i].PositionID;
          y["PositionName"] = this.roleNames[i].PositionName;
          console.log("role names:"+y);
          y["TaskDetails"] = x;
          var z = this.taskService.postTask(y).subscribe(data=>{
            console.log(data);
            result= true;
            (result) ? ( alert("Successfully submitted the task details"),
          this.taskdetails.splice(index-1,1),
          //  this.taskService.getPositionRolesTasks().subscribe(data=>{
          //   this.roleNames = data;
          //   console.log("details"+this.roleNames[0].RoleName);
          //   this.selectedItem = this.roleNames[0];
          //   this.taskdetails = this.roleNames[0].TaskDetails;           
          //   if(this.roleNames[0].TaskDetails.length>0){
          //     this.taskdetails.forEach(element => {
          //         element.RoleID = this.roleNames[0].RoleID;                  
          //     });   
          //   }
          //   else
          //     this.taskdetails ="";
          //     var elements = document.getElementsByClassName('bs-popover-bottom');
          //     while(elements.length > 0){
          //         elements[0].parentNode.removeChild(elements[0])
          //     }             
          // }),
            console.log(this.taskdetails),
            console.log("result:"+result)
            ):(
              console.log("result:"+result),
                alert("Failed to submit task")
            )
            var elements = document.getElementsByClassName('bs-popover-bottom');
             while(elements.length > 0){
                  elements[0].parentNode.removeChild(elements[0]);
              }
              this.custtaskdisabled = false;  
          })
          console.log(z);
        }
      }     
    }        
    // this.router.navigateByUrl('/task');
  }
  addCustTask(data){
    console.log(data);
    var cust=[];
    cust["TaskName"] = data.TaskName;
    cust["Description"] = data.TaskDescription;
    cust["RoleID"] = data.roleDetails.RoleID;
    console.log(cust);
    this.taskService.getMaxValueTask().subscribe(data=>{
      this.maxTaskID = data as number;
      console.log("title inside user:"+this.maxTaskID);
      cust["SystemDuration"]="";
      cust["UserDuration"]="";
      cust["TaskID"]= this.maxTaskID +1;
      this.roleNames.forEach(x => {
        if(x.RoleID == cust["RoleID"]){
          x.TaskDetails.push(cust);
        }
      });
      // this.taskdetails.push(cust);
    });
    console.log("Custom task"+this.taskdetails);
    alert("Add custom task sucessfully");
    this.taskbuttondisabled = false;
    var elements = document.getElementsByClassName('bs-popover-bottom');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0])
    }
    // document.getElementById('taskBtn').style.cursor="pointer";
    // this.taskService.postCustomTask(cust);
      // this.roleNames.forEach(element => {
      //   if(data.roleDetails.RoleName == element.RoleName){
      //     this.roleNames.TaskDetails.add([data.TaskName,data.TaskDescription,])
      //   }
      // });
  }
  close(){
    this.taskbuttondisabled = false;
    var elements = document.getElementsByClassName('bs-popover-bottom');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0])
    }
  }

  opencustomtask() {
    // var elements = document.getElementsByClassName('popover');
    // while(elements.length > 0){
    //     elements[0].parentNode.removeChild(elements[0]);
    // }
    this.taskbuttondisabled = true;
    // document.getElementById('taskBtn').style.cursor="no-drop";
  }

  taskbutton() {
    this.custtaskdisabled = true;
    var elements = document.getElementsByClassName('popover');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  }
}
