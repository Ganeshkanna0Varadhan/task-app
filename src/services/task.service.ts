import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private host = 'https://task-flow-c8988-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  createTask(task: Task) {
    return this.http.post<{name: string}>(`${this.host}/tasks.json`, task);
  }

  fetchAlltasks() {
    return this.http.get(`${this.host}/tasks.json`);
  }
}
