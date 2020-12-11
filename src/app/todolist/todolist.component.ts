import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor( 
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private http: HttpClient
    ) { }

  todoListData : Array<any> = undefined;
  userId: any = undefined;
  description: any = undefined;
  showLoader: boolean = false;

  ngOnInit(): void {
    
    if (this.activatedRoute.snapshot.params["id"]) {

      this.userId = this.activatedRoute.snapshot.params["id"];
      this.getUserTodoList(this.userId).then(
        data => {
          this.todoListData = data.results;
        }
      );
		}
    
  }

  getUserTodoList(id){
    let url = 'http://127.0.0.1:8082/todo-list/get-todo-list/' + id.toString();
    return this.http.get<any>(url)
      .toPromise()
      .then(res => res)
      .catch(err => err)

  }

  removeEntry(item){
    console.log(item)
    let index = this.todoListData.indexOf(item);
    this.todoListData.splice(index,1)
    let url = 'http://127.0.0.1:8082/todo-list/deleteFrom-todo-list/' + item._id.toString();
    console.log(url)
    return this.http.delete<any>(url)
      .toPromise()
      .then(res => res)
      .catch(err => err)
  }

  addToList(){
    let obj = {
      userId: this.userId,
      description: this.description
    }
    let url = 'http://127.0.0.1:8082/todo-list/addTo-todo-list/'
    // return this.http.post<any>(url,obj)
    // console.log(obj)
    this.showLoader=true;
    return this.http.post<any>(url,obj)
      .toPromise()
      .then( data=> {
        if (data['status'] == 200) {
          this.getUserTodoList(this.userId).then(
            data => {
              this.todoListData = data['results'];
              this.showLoader=false;

            } 
          );
        }
      })
      
  }

}
