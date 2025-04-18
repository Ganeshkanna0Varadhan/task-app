import { Component, inject } from '@angular/core';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { DeleteTaskComponent } from '../components/delete-task/delete-task.component';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule,
    CreateTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  emptyCards = new Array(10).fill(null);
  createTask: boolean = false;
  deleteTask: boolean = false;
  viewTask: boolean = false;
  updateTask: boolean = false;
  loading: boolean = false;
  editedData = {};
  taskService = inject(TaskService);

  ngOnInit(): void {
    this.loading = true;
    this.taskService.fetchAlltasks().pipe(finalize(() => {
      this.loading = false;
    })).subscribe({
      next: (data: any) => {
        console.log("data", data);
      },
      error: (err) => {
        console.log(err);
      }        
    });
    
  }

  manageCreateTask() {
    this.createTask = !this.createTask;
  }

  manageDelete() {
    this.deleteTask = !this.deleteTask;
  }

  manageViewTask() {
    this.viewTask = !this.viewTask;
  }

  mangeUpdateTask() {
    this.updateTask = !this.updateTask;
  }

  handleDeleteTask() {
    console.log("this.deleteTask");
  }

  handleCreateTask(task: Task) {
    this.taskService.createTask(task).subscribe((result) => {
      console.log("result ", result);
    })
  }

  
 


  
}
