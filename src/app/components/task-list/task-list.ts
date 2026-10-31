import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  tasks = input.required<Task[]>();

  completedChange = output<number>();
}
