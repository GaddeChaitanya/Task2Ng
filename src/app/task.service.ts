import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Taskrecord} from './Taskrecord';
import {Role} from './Role';

@Injectable()
export class TaskService {
  public postTaskStatus: boolean;
  // roleList:Role[];
  // taskList: Task[];

  constructor(private http:Http, private https:HttpClient) { }

  // postTask(record: Taskrecord){
  //   var body = JSON.stringify(cust);
  //   var headerOptions = new Headers({'Content-Type':'application/json'});
  //   var requestOptions = new RequestOptions({method: RequestMethod.Post, headers:headerOptions})
  //   return this.http.post( AppSettings.API_ENDPOINT+'Customers/',body, requestOptions).map(x=>x.json());
  // }

  // postTaskRecord(record: Taskrecord){
  //   var body = JSON.stringify(cust);
  //   var headerOptions = new Headers({'Content-Type':'application/json'});
  //   var requestOptions = new RequestOptions({method: RequestMethod.Post, headers:headerOptions})
  //   return this.http.post( AppSettings.API_ENDPOINT+'Customers/',body, requestOptions).map(x=>x.json());
  // }

  // getRoleList(){
  //   this.http.get(AppSettings.API_ENDPOINT+'GetCustomerList/')
  //   .map((data: Response)=>{
  //     return data.json() as Customer[];
  //   }).toPromise().then(x=>{
  //     this.customerList =x;
  //   }).catch(this.handleError)
  //   console.log(this.customerList);
  // }
  // getTaskList(){
  //   this.http.get(AppSettings.API_ENDPOINT+'GetCustomerList/')
  //    .map((data: Response)=>{
  //      return data.json() as Customer[];
  //    }).toPromise().then(x=>{
  //      this.userName =x;
  //    }).catch(this.handleError)
  //    console.log(this.customerList);
  // }
  
  // getUser(){
  //   this.http.get('http://localhost:52115/Service1.svc/Data/?id=1')
  //    .map((data: Response)=>{
  //      console.log("user "+data.json());
  //      return data.json() as string;
  //    }).toPromise().then(x=>{
  //      this.userName =x;
  //      console.log(this.userName);
  //    }).catch(this.handleError);
  // }
  public getUser(){
    return this.http.get('http://localhost:65438/api/Values/1').map(res=>res.json());
  }

  public getPositionRolesTasks(){
    // return this.http.get('http://localhost:51652/Service1.svc/PositionRoles/?id=100').map(res=>res.json());
    return this.http.get('http://localhost:65438/api/Tasks/100').map(res=>res.json());
  }

  public getMaxValueTask(){
    return this.http.get('http://localhost:65438/api/Values').map(res=>res.json());
  }
  postTask(record){
    this.postTaskStatus = false;
    console.log(record);
    console.log(record.TaskDetails.TaskName);
      var body = JSON.stringify({"RoleID":record.RoleID,"RoleName":record.RoleName,"Description":record.Description,"TaskDetails":[{"TaskID":record.TaskDetails.TaskID,"TaskName":record.TaskDetails.TaskName,"Description":record.TaskDetails.Description,"UserDuration":record.TaskDetails.UserDuration,"SystemDuration":record.TaskDetails.SystemDuration}],"PositionID":record.PositionID,"PositionName":record.PositionName});
      console.log(body);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method: RequestMethod.Post, headers:headerOptions});
      // return this.https.post('http://localhost:51652/Service1.svc/InsertTaskRecord',body).subscribe(data=>{
      return this.http.post('http://localhost:65438/api/Tasks/',body, requestOptions).map((res:Response)=>res.json());
      // (err: HttpErrorResponse)=>{
      //   this.postTaskStatus = false;
      //   // if(err.error instanceof Error){
      //   //   console.log("client side: "+err.error);
      //   // }else{
      //   //   console.log(" Server Error occured"+err.error);
      //   // }
      // });
    }
   
    postCustomTask(record){
      console.log(record);
      var body = JSON.stringify({"RoleID":record.RoleID,"TaskName":record.TaskName,"TaskDescription":record.TaskDescription});   
      console.log("json "+body);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method: RequestMethod.Post, headers:headerOptions});
      return this.http.post('http://localhost:65438/api/Values',body,requestOptions).map((res:Response)=>res.json());
    }  


 public handleError = (error: Response) => { 
    // Do messaging and error handling here
    console.log("erroer  "+error)
    return Observable.throw(error);
}

public getTasksJSON(id:number): Observable<any> {
  return this.http.get("../../../assets/tasks.json")
                  .map((res:any) => res.json().filter(item => item.taskID === id));
}

public getRolesJSON(): Observable<any> {
  return this.http.get("../../../assets/roles.json")
                  .map(res => res.json());
}

public postData(bodyValue){
  var body = JSON.stringify(bodyValue);
  var headerOptions = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method: RequestMethod.Post, headers:headerOptions});
  return this.http.post( 'http://localhost:51652/Service1.svc/InsertData',body,requestOptions).subscribe(data=>{
    console.log(data)},
  (err: HttpErrorResponse)=>{
    if(err.error instanceof Error){
      console.log("client side: "+err.error);
    }else{
      console.log(" Server Error occured"+err.error);
    }
  });
}
}
