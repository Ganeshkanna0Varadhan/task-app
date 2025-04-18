import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  closeMenu() {
    this.close.emit();
  }

  deleteTask() {
    this.delete.emit();
  }

  
  ngOnDestroy(): void {
    this.close.unsubscribe();
    this.delete.unsubscribe();
  }

}
