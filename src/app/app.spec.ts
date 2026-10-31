import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Taskflow');
  });

  it('should have two task pending ', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.componentInstance;

    expect(app.pendingCount()).toBe(2);
  });

  it('should have reduce the pending task when toggle a task', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.componentInstance;

    expect(app.pendingCount()).toBe(2);
    app.ToggleTask(1);
    expect(app.pendingCount()).toBe(1);
  });

  it('should have increase the pending task when toggle a task completed', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.pendingCount()).toBe(2);
    app.ToggleTask(2);
    expect(app.pendingCount()).toBe(3);
  });

  it('a task should have enter in the list of pending when created', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.addTask({
      title: 'Task 4',
      description: 'Description for Task 4',
    });
    expect(app.pendingCount()).toBe(3);
    expect(app.tasks().length).toBe(4);
    expect(app.tasks()[3].title).toBe('Task 4');
  });

  it('tasks without title should not be created', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.addTask({
      title: '',
      description: 'Description for Task 5',
    });
    expect(app.tasks().length).toBe(3);
  });

  it('tasks with title only spaces should not be created', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.addTask({
      title: '   ',
      description: 'Description for Task 5',
    });
    expect(app.tasks().length).toBe(3);
  });

  it('should add a task when a task is send to the form', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const titleInput = element.querySelector(
      'app-task-form input[name="title"]',
    ) as HTMLInputElement;
    const descriptionInput = element.querySelector(
      'app-task-form textarea[name="description"]',
    ) as HTMLTextAreaElement;
    const submitButton = element.querySelector(
      'app-task-form button[type="submit"]',
    ) as HTMLButtonElement;

    expect(titleInput).not.toBeNull();
    expect(descriptionInput).not.toBeNull();
    expect(submitButton).not.toBeNull();

    titleInput.value = 'Task 4';
    titleInput.dispatchEvent(new Event('input'));

    descriptionInput.value = 'Description for Task 4';
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    submitButton.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelectorAll('app-task-card').length).toBe(4);
    expect(app.pendingCount()).toBe(3);
    expect(element.querySelector('app-task-card:last-child h3')?.textContent).toContain('Task 4');
  });

  it('should not have a task with two id equals', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.tasks.set([
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        completed: false,
      },
      {
        id: 3,
        title: 'Task 2',
        description: 'Description for Task 2',
        completed: false,
      },
    ]);

    app.addTask({
      title: 'Task 3',
      description: 'Description for Task 3',
    });

    expect(app.tasks()[2].id).not.toBe(3);
    expect(app.tasks()[2].id).not.toBe(1);
  });
});
