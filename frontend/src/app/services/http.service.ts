import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){
    this.getTasks();
    // this.getTask("5caac6ff5cafeb6b2407d6b7")
  }

  getTasks(){
    return this._http.get('/tasks');
  }

  getTaskById(id) {
    return this._http.get(`/tasks/${id}`);
  }
}
