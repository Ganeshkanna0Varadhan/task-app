import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  myForm!: FormGroup;
  @Input() updateData: any = {};
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl(null, Validators.required),
      assignedTo: new FormControl(null, Validators.required),
      createdAt: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });

    console.log(this.close);
  }

  ngAfterViewInit(): void {
    this.myForm.setValue({
      title: this.updateData.title,
      description: this.updateData.description ,
      assignedTo: this.updateData.assignedTo,
      createdAt: this.updateData.createdAt,
      priority: this.updateData.priority,
      status: this.updateData.status,
    })
    
  }


  handleSubmit() {
    console.log(this.myForm);
  }

  closeMenu() {
    this.close?.emit();
  }

  ngOnDestroy(): void {
    this.close.unsubscribe();
  }

}
