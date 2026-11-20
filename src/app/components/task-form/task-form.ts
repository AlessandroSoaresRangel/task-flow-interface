import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  title = '';
  description = '';
  taskCreated = output<{ title: string; description: string }>();
  taskToEdit = input<Task | null>(null);

  constructor() {
    effect(() => {
      const task = this.taskToEdit();

      if (task === null) {
        return;
      }

      this.title = task.title;
      this.description = task.description;
    });
  }

  onSubmit() {
    if (!this.title.trim()) {
      return;
    }
    this.taskCreated.emit({ title: this.title, description: this.description });
    this.title = '';
    this.description = '';
  }
}
