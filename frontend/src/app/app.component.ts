import { Component } from '@angular/core';
import {HttpService} from "./services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks = [];
  task = {};

  title = 'frontend';
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    // this.getTasksFromService();
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data)
      this.tasks = data['tasks'];
    });
  }

  getOneFromService(id: string) {
    let observable = this._httpService.getTaskById(id);
    observable.subscribe(data => {
      console.log("Got one task by Id!", data)
      this.task = data['task'];
    });
  }
}
