import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<any>();

  closeMenu() {
    this.close.emit();
  }

}
