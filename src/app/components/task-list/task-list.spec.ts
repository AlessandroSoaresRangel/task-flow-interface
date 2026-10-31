import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskList } from './task-list';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('tasks', []);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no tasks available when the tasks input is empty', () => {
    const element = fixture.nativeElement as HTMLElement;
    const noTasks = element.querySelector('.no_tasks') as HTMLElement;

    expect(noTasks).not.toBeNull();
    expect(noTasks!.textContent).toContain('No tasks available');
  });

  it('should render two tasks when receiving two tasks', () => {
    fixture.componentRef.setInput('tasks', [
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
    ]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const taskCards = element.querySelectorAll('app-task-card');

    expect(taskCards.length).toBe(2);
  });
});
