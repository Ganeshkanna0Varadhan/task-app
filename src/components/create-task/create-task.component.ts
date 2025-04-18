import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl(null, Validators.required),
      assignedTo: new FormControl(null, Validators.required),
      createdAt: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    })
  }
  handleSubmit() {

  }
}
