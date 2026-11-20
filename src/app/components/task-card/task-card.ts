import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<Task>();
  completedChange = output<number>();
  taskRemoved = output<number>();
  editRequested = output<number>();

  toggleCompleted() {
    this.completedChange.emit(this.task().id);
  }

  removeTask() {
    this.taskRemoved.emit(this.task().id);
  }
  requestEdit() {
    this.editRequested.emit(this.task().id);
  }
}
