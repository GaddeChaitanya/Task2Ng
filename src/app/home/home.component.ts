import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TaskService} from '../task.service';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[TaskService]
})
export class HomeComponent implements OnInit {

  title: any;
  list:any;
  selected :any;
  condition:boolean;
  taskList: boolean;
  startTask:boolean;
  constructor(private router: Router,private http:Http, private taskService: TaskService) {
    this.list = [
       'Developer',
       'Team Lead'
    ];
    this.condition = false;
    this.taskList  = false;
    this.title = this.getUser();
    this.startTask = true;
    // taskService.getUser();
    // this.title = taskService.userName;
  }
  select(item) {
      this.selected = item; 
      this.condition = true;
  };
  isActive(item) {
      return this.selected === item;
  };
  start(){
    this.startTask = false;
    // this.router.navigateByUrl('/task');
  }
   
  // getUser(){
  //   this.http.get('http://localhost:50714/api/values/1')
  //    .map((data: Response)=>{
  //      return data.json() as string;
  //    }).toPromise().then(x=>{
  //      this.title =x;
  //    }).catch(this.handleError);
  // }
  getUser(): Observable<string> {
    console.log('Calling getUser');
    return this.http.get('http://localhost:50714/api/values/1')
      .map((data: Response) =>{
        return data.json() as string;
      });
  }
 public handleError = (error: Response) => { 
    // Do messaging and error handling here
    return Observable.throw(error);
}

  ngOnInit() {
  }

}
