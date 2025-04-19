import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private host = 'https://task-flow-c8988-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  createTask(task: Task) {
    return this.http.post<{name: string}>(`${this.host}/tasks.json`, task);
  }

  updateTask(id: string, update: Task) {
    return this.http.put<Task>(`${this.host}/tasks/${id}.json`, update);
  }

  fetchAlltasks() {
    return this.http.get(`${this.host}/tasks.json`);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.host}/tasks/${id}.json`);
  }
}
