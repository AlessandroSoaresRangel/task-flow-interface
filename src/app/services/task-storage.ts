import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskStorage {
  private isValidTaskList(parsedData: unknown): boolean {
    if (!Array.isArray(parsedData)) {
      return false;
    }
    const allTasksAreValid = parsedData.every((task) => {
      if (
        typeof task !== 'object' ||
        task === null ||
        !('id' in task) ||
        !('title' in task) ||
        !('description' in task) ||
        !('completed' in task)
      ) {
        return false;
      }

      if (
        typeof task.id !== 'number' ||
        typeof task.title !== 'string' ||
        typeof task.description !== 'string' ||
        typeof task.completed !== 'boolean'
      ) {
        return false;
      }
      return true;
    });

    if (!allTasksAreValid) {
      return false;
    }
    return true;
  }
  loadTasks(): Task[] {
    try {
      const tasksJson = localStorage.getItem('taskflow.tasks');
      if (!tasksJson) {
        return [];
      }
      const parsedData: unknown = JSON.parse(tasksJson);
      if (this.isValidTaskList(parsedData)) {
        return parsedData as Task[];
      }
      return [];
    } catch {
      return [];
    }
  }
}
