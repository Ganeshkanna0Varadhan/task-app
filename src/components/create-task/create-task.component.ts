import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
  host: {ngSkipHydration: ''}
})
export class CreateTaskComponent {
  myForm!: FormGroup;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() createTask: EventEmitter<Task> = new EventEmitter<Task>();

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl(null, Validators.required),
      assignedTo: new FormControl(null, Validators.required),
      createdAt: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });

  }
  handleSubmit() {
    this.createTask.emit(this.myForm.value);
    this.myForm.reset();
    this.close.emit();
  }

  closeMenu() {
    this.close?.emit();
  }

  ngOnDestroy(): void {
    this.close.unsubscribe();
  }


}
