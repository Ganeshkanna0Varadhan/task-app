import { Component } from '@angular/core';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../components/create-task/create-task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule,
    CreateTaskComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  emptyCards = new Array(10).fill(null);
}
