import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForm } from './task-form';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with title, description inputs and a button', () => {
    const element = fixture.nativeElement as HTMLElement;

    const titleInput = element.querySelector('form input[name="title"]') as HTMLInputElement;

    const descriptionInput = element.querySelector(
      'form textarea[name="description"]',
    ) as HTMLTextAreaElement;

    const submitButton = element.querySelector('form button[type="submit"]') as HTMLButtonElement;

    expect(titleInput).not.toBeNull();
    expect(descriptionInput).not.toBeNull();
    expect(submitButton).not.toBeNull();
  });

  it('should update when the title input value changes', () => {
    const element = fixture.nativeElement as HTMLElement;
    const titleInput = element.querySelector('form input[name="title"]') as HTMLInputElement;

    expect(titleInput).not.toBeNull();

    titleInput!.value = 'New Task Title';
    titleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.title).toBe('New Task Title');
  });

  it('should update when the description input value changes', () => {
    const element = fixture.nativeElement as HTMLElement;
    const descriptionInput = element.querySelector(
      'form textarea[name="description"]',
    ) as HTMLTextAreaElement;

    expect(descriptionInput).not.toBeNull();

    descriptionInput!.value = 'New Task Description';
    descriptionInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.description).toBe('New Task Description');
  });

  it('should emit the submit event with the title and description when the form is submitted', () => {
    const element = fixture.nativeElement as HTMLElement;

    const submitButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
    const titleInput = element.querySelector('form input[name="title"]') as HTMLInputElement;
    const descriptionInput = element.querySelector(
      'form textarea[name="description"]',
    ) as HTMLTextAreaElement;

    expect(submitButton).not.toBeNull();
    expect(titleInput).not.toBeNull();
    expect(descriptionInput).not.toBeNull();

    titleInput!.value = 'New Task Title';
    descriptionInput!.value = 'New Task Description';

    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    let emittedData: { title: string; description: string } | undefined;

    component.taskCreated.subscribe((data: { title: string; description: string }) => {
      emittedData = data;
    });

    submitButton!.click();
    fixture.detectChanges();

    expect(emittedData).toEqual({
      title: 'New Task Title',
      description: 'New Task Description',
    });
  });

  it('should clear the form inputs after submission', async () => {
    const element = fixture.nativeElement as HTMLElement;

    const submitButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
    const titleInput = element.querySelector('form input[name="title"]') as HTMLInputElement;
    const descriptionInput = element.querySelector(
      'form textarea[name="description"]',
    ) as HTMLTextAreaElement;

    expect(submitButton).not.toBeNull();
    expect(titleInput).not.toBeNull();
    expect(descriptionInput).not.toBeNull();

    titleInput!.value = 'New Task Title';
    descriptionInput!.value = 'New Task Description';

    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    submitButton!.click();

    expect(component.title).toBe('');
    expect(component.description).toBe('');

    fixture.detectChanges();
    await fixture.whenStable();

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  it('should not emit the submit event when the title is empty', () => {
    const element = fixture.nativeElement as HTMLElement;

    const submitButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
    const titleInput = element.querySelector('form input[name="title"]') as HTMLInputElement;
    const descriptionInput = element.querySelector(
      'form textarea[name="description"]',
    ) as HTMLTextAreaElement;

    expect(submitButton).not.toBeNull();
    expect(titleInput).not.toBeNull();
    expect(descriptionInput).not.toBeNull();

    titleInput!.value = '';
    descriptionInput!.value = 'New Task Description';

    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    let emittedData: { title: string; description: string } | undefined;

    component.taskCreated.subscribe((data: { title: string; description: string }) => {
      emittedData = data;
    });

    submitButton!.click();
    fixture.detectChanges();

    expect(emittedData).toBeUndefined();
  });

  it('should not emit the submit event when the title is only whitespace', () => {
    const element = fixture.nativeElement as HTMLElement;

    const submitButton = element.querySelector('button[type="submit"]') as HTMLButtonElement;
    const titleInput = element.querySelector('form input[name="title"]') as HTMLInputElement;
    const descriptionInput = element.querySelector(
      'form textarea[name="description"]',
    ) as HTMLTextAreaElement;

    expect(submitButton).not.toBeNull();
    expect(titleInput).not.toBeNull();
    expect(descriptionInput).not.toBeNull();

    titleInput!.value = '   ';
    descriptionInput!.value = 'New Task Description';

    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    let emittedData: { title: string; description: string } | undefined;

    component.taskCreated.subscribe((data: { title: string; description: string }) => {
      emittedData = data;
    });

    submitButton!.click();
    fixture.detectChanges();

    expect(emittedData).toBeUndefined();
  });
});
