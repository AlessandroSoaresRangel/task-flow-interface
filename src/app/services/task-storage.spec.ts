import { TestBed } from '@angular/core/testing';

import { TaskStorage } from './task-storage';

import { Task } from '../models/task.model';

describe('TaskStorage', () => {
  let service: TaskStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStorage);
  });
  afterEach(() => {
    localStorage.removeItem('taskflow.tasks');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a empty array when no tasks are stored', () => {
    localStorage.removeItem('taskflow.tasks');

    expect(service.loadTasks()).toEqual([]);
  });

  it('should load the stored tasks', () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
    ];
    localStorage.setItem('taskflow.tasks', JSON.stringify(tasks));

    expect(service.loadTasks()).toEqual(tasks);
  });

  it('should return an empty array when stored data is not valid json', () => {
    localStorage.setItem('taskflow.tasks', 'it is not json');

    expect(service.loadTasks()).toEqual([]);
  });

  it('should return an empty array when json is not an array', () => {
    localStorage.setItem('taskflow.tasks', '{}');

    expect(service.loadTasks()).toEqual([]);
  });

  it('should return am empty array when json is an array of tasks without the required properties', () => {
    const invalidTasks = [{ id: 1, title: 'Task 1', description: 'Description 1' }];
    localStorage.setItem('taskflow.tasks', JSON.stringify(invalidTasks));

    expect(service.loadTasks()).toEqual([]);
  });

  it('should return an empty array when a task has an invalid property type', () => {
    const invalidTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', completed: 'false' },
    ];
    localStorage.setItem('taskflow.tasks', JSON.stringify(invalidTasks));

    expect(service.loadTasks()).toEqual([]);
  });
});
