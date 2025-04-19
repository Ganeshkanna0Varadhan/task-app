import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  @Input('deleteData') deleteTaskData!: Task;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  closeMenu() {
    this.close.emit();
  }

  deleteTask() {
    this.delete.emit(this.deleteTaskData.id);
    this.close.emit();
  }


  ngOnDestroy(): void {
    this.close.unsubscribe();
    this.delete.unsubscribe();
  }

}
