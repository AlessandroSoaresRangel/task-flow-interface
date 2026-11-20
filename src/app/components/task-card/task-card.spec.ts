import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCard } from './task-card';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      completed: false,
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not apply completed styles when a task is pending', () => {
    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('article') as HTMLElement;

    expect(card).not.toBeNull();

    expect(card!.classList.contains('completed')).toBe(false);
  });

  it('should apply completed class when a task is updated', () => {
    fixture.componentRef.setInput('task', {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: true,
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('article') as HTMLElement;

    expect(card).not.toBeNull();
    expect(card!.classList.contains('completed')).toBe(true);

    fixture.componentRef.setInput('task', {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: false,
    });
    fixture.detectChanges();

    expect(card!.classList.contains('completed')).toBe(false);
  });

  it('should emit the ID of the task when the button is clicked', () => {
    let emittedTaskId: number | undefined;

    component.completedChange.subscribe((taskId: number) => {
      emittedTaskId = taskId;
    });

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button') as HTMLButtonElement;
    expect(button).not.toBeNull();

    button!.click();
    expect(emittedTaskId).toBe(1);
  });

  it('should emit the ID of the task when the remove button is clicked', () => {
    let emittedTaskId: number | undefined;

    component.taskRemoved.subscribe((taskId: number) => {
      emittedTaskId = taskId;
    });

    const element = fixture.nativeElement as HTMLElement;
    const removeButton = element.querySelector('button.remove-button') as HTMLButtonElement;
    expect(removeButton).not.toBeNull();

    removeButton!.click();
    expect(emittedTaskId).toBe(1);
  });

  it('should emit the Id of the task when the update button is clicked', () => {
    let emittedTaskId: number | undefined;

    component.editRequested.subscribe((taskId: number) => {
      emittedTaskId = taskId;
    });

    const element = fixture.nativeElement as HTMLElement;

    const updateButton = element.querySelector('button.update') as HTMLButtonElement;
    expect(updateButton).not.toBeNull();

    updateButton!.click();
    expect(emittedTaskId).toBe(1);
  });
});
