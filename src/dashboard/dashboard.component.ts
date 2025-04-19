import { Component, inject } from '@angular/core';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { DeleteTaskComponent } from '../components/delete-task/delete-task.component';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { ViewTaskComponent } from '../components/view-task/view-task.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule,
    CreateTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    LoadingSpinnerComponent,
    SnackbarComponent
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
  spinnerLoading: boolean = false;
  errorMessage = '';
  selectedData!: Task;
  taskService = inject(TaskService);
  taskList: Task[] = [];

  ngOnInit(): void {
    this.fetchAllTask();
  }

  manageCreateTask() {
    this.createTask = !this.createTask;
  }

  fetchAllTask() {
    this.loading = true;
    this.taskList = [];
    this.taskService.fetchAlltasks().pipe(map((data: any) => {
      let taskList = []
      for (let key of Object.keys(data)) {
        taskList.push(new Task(key, data[key].title, data[key].description, data[key].assignedTo , data[key].createdAt, data[key].priority, data[key].status));
      }
      return taskList;
    }) ,finalize(() => {
      this.loading = false;
    }), catchError((err) => {
      this.setErroMessage(err);
      return throwError(() => err);
    })).subscribe({
      next: (data: any) => {
        this.taskList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  mangeOpeation(data : {type: number, id: string}) {
    let selectedTask;
    switch(data.type) {
      case 1:
        this.manageViewTask();
        selectedTask = this.getSelectedData(data.id);
        if (!selectedTask) return
        this.selectedData = selectedTask;
        break;
      case 2:
        this.mangeUpdateTask();
        selectedTask = this.getSelectedData(data.id);
        if (!selectedTask) return
        this.selectedData = selectedTask;
        break;
      case 3:
        this.manageDelete();
        selectedTask = this.getSelectedData(data.id);
        if (!selectedTask) return
        this.selectedData = selectedTask;
        break
    }
  }

  getSelectedData(id: string) {
    let findTask = this.taskList.find((obj ) => obj.id === id) as Task;
    if (!findTask) return;
    this.selectedData = findTask;
    return this.selectedData;
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

  handleDeleteTask(id: any) {
    this.spinnerLoading = true
    this.taskService.deleteTask(id).pipe(finalize(() => {
      this.spinnerLoading = false;
    }), catchError((err) => {
      this.setErroMessage(err);
      return throwError(() => err);
    })).subscribe({
      next: (data) => {
        let index = this.taskList.findIndex((task) => task.id === id);
        if (index < 0) return;
        this.taskList.splice(index, 1);
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

  handleUpdateTask({id, value} : {id: string, value: Task}) {
    this.spinnerLoading = true;
    this.taskService.updateTask(id, value).pipe(finalize(() => {
      this.spinnerLoading = false;
    }), catchError((err) => {
      this.setErroMessage(err);
      return throwError(() => err);
    })).subscribe({
      next: (data) => {
        let index = this.taskList.findIndex((task) => task.id === id);
        if (index < 0) return;
        this.taskList[index].assignedTo = data.assignedTo;
        this.taskList[index].description = data.description;
        this.taskList[index].title = data.title;
        this.taskList[index].createdAt = data.createdAt;
        this.taskList[index].priority = data.priority;
        this.taskList[index].status = data.status;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleCreateTask(task: Task) {
    this.taskService.createTask(task).pipe(catchError((err) => {
      this.setErroMessage(err);
      return throwError(() => err);
    })).subscribe({
      next: (data) => {
        this.fetchAllTask();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setErroMessage(err: HttpErrorResponse) {
    if(err.error.error === 'Permission denied') {
      this.errorMessage = 'You do not have permission to perform the action';
    }
    else {
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000)
  }
}
