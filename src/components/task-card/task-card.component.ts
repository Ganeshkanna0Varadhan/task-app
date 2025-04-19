import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input('task') task!: Task;
  @Output('operation') manageOperation = new EventEmitter<{type: number, id: string}>();

  deleteTask(id: string) {
    this.manageOperation.emit({type: 3, id: id});
  }

  editTask(id: string) {
    this.manageOperation.emit({type: 2, id: id});
  }

  viewTask(id: string) {
    this.manageOperation.emit({type: 1, id: id});
  }

}
