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

  it('should remove a task selected and dont change the others', () => {
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
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        completed: false,
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
        completed: false,
      },
    ]);

    app.removeTask(2);

    expect(app.tasks().length).toBe(2);
    expect(app.tasks().map((task) => task.id)).toEqual([1, 3]);
    expect(app.pendingCount()).toBe(2);
  });

  it('should remove a task when the remove button is clicked', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    const taskCard = element.querySelector('app-task-card') as HTMLElement;
    const removeButton = taskCard.querySelector('.remove-button') as HTMLButtonElement;

    expect(removeButton).not.toBeNull();

    app.tasks.set([
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
        completed: false,
      },
    ]);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelectorAll('app-task-card').length).toBe(2);

    removeButton.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelectorAll('app-task-card').length).toBe(1);

    expect(app.tasks().length).toBe(1);
    expect(app.tasks()[0].id).toBe(2);
  });

  it('should filter the taks by pending', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    app.selectedFilter.set('pending');
    let visibleTasks = app.visibleTasks().map((task) => task.id);

    expect(visibleTasks.length).toBe(2);
    expect(visibleTasks).toEqual([1, 3]);
  });

  it('should filter the taks by completed and all', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    app.selectedFilter.set('completed');
    let visibleTasks = app.visibleTasks().map((task) => task.id);

    expect(visibleTasks.length).toBe(1);
    expect(visibleTasks).toEqual([2]);

    app.selectedFilter.set('all');
    visibleTasks = app.visibleTasks().map((task) => task.id);

    expect(visibleTasks.length).toBe(3);
    expect(visibleTasks).toEqual([1, 2, 3]);
  });

  it('should have a toggle a task', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(app.pendingCount()).toBe(2);

    const toggleButton = element.querySelector<HTMLButtonElement>('app-task-card .toggle');
    toggleButton!.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(app.pendingCount()).toBe(1);
  });

  it('should filter the tasks by pending when the filter button is clicked and cleared', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    const filterButton = element.querySelector<HTMLButtonElement>('.filter-button');

    fixture.detectChanges();

    expect(filterButton).not.toBeNull();

    filterButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const pendingButton = element.querySelector<HTMLButtonElement>('button[data-filter="pending"]');

    expect(pendingButton).not.toBeNull();

    pendingButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const tasksTitles = element.querySelectorAll('app-task-card h3');

    const tasksTitlesText = Array.from(tasksTitles).map((title) => title.textContent?.trim());

    expect(tasksTitlesText).toEqual(['Task 1', 'Task 3']);

    filterButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const allButton = element.querySelector<HTMLButtonElement>('button[data-filter="all"]');

    expect(allButton).not.toBeNull();

    allButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const tasksTitlesAfterClear = element.querySelectorAll('app-task-card h3');

    const tasksTitlesTextAfterClear = Array.from(tasksTitlesAfterClear).map((title) =>
      title.textContent?.trim(),
    );

    expect(tasksTitlesTextAfterClear).toEqual(['Task 1', 'Task 2', 'Task 3']);
  });

  it('should update a task', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    app.updateTask(2, {
      title: 'Updated Task 2',
      description: 'new description for Task 2',
    });

    const updatedTask = app.tasks().find((task) => task.id === 2);

    expect(updatedTask).toMatchObject({
      id: 2,
      title: 'Updated Task 2',
      description: 'new description for Task 2',
      completed: true,
    });

    expect(app.tasks().length).toBe(3);
  });

  it('should not update a task with a empty property', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    app.updateTask(2, {
      title: '',
      description: 'new description for Task 2',
    });

    const updatedTask = app.tasks().find((task) => task.id === 2);

    expect(updatedTask).toMatchObject({
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: true,
    });

    expect(app.tasks().length).toBe(3);
  });

  it('should click the edit button and update a task', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    const editButton = element.querySelector<HTMLButtonElement>('app-task-card .update');
    expect(editButton).not.toBeNull();

    editButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const titleInput = element.querySelector<HTMLInputElement>(
      'app-task-form input[name="title"]',
    )?.value;

    expect(titleInput).toBe('Task 1');

    const descriptionInput = element.querySelector<HTMLTextAreaElement>(
      'app-task-form textarea[name="description"]',
    )?.value;

    expect(descriptionInput).toBe('Description for Task 1');
  });
});
