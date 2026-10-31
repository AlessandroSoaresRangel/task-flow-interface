import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSubmit() {
    if (!this.title.trim()) {
      return;
    }
    this.taskCreated.emit({ title: this.title, description: this.description });
    this.title = '';
    this.description = '';
  }
}
