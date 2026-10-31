import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';
import type { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskList, TaskForm],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: true,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      completed: false,
    },
  ]);

  completedCount = computed(() => this.tasks().filter((task) => task.completed).length);
  pendingCount = computed(() => this.tasks().filter((task) => !task.completed).length);

  ToggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }
  addTask(task: Omit<Task, 'id' | 'completed'>) {
    if (!task.title.trim()) {
      return;
    }

    const taskIds = this.tasks().map((task: Task) => task.id);

    const newTask: Task = {
      id: taskIds.length > 0 ? Math.max(...taskIds) + 1 : 1,
      title: task.title,
      description: task.description,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
}
