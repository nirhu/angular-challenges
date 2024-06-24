import { Component, inject, input, output } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { ButtonLoadingOverlayDirective } from './button-loading-overlay.directive';
import { LoadingService } from './loading.service';
import { TodoItem, TodoService } from './todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  template: `
    <div class="in-line" [appButtonLoadingOverlay]="'todos/' + this.todo().id">
      {{ todo().title }} {{ todo().completed ? '✔' : 'X' }}
      <button (click)="complete(!todo().completed)">
        {{ todo().completed ? 'Uncheck' : 'Check' }}
      </button>
      <button (click)="updateTitle()">Update</button>
      <button (click)="delete()">Delete</button>
      @if (loaderService.isLoading('todos/' + this.todo().id)) {
        <mat-progress-spinner
          class="spinner"
          mode="indeterminate"
          [diameter]="20"></mat-progress-spinner>
      }
    </div>
  `,
  styles: `
    .in-line {
      display: flex;
      flex-flow: row;
    }
  `,
  imports: [MatProgressSpinner, ButtonLoadingOverlayDirective],
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  loaderService = inject(LoadingService);

  todo = input.required<TodoItem>();
  updated = output<TodoItem>();
  deleted = output<TodoItem>();

  complete(done: boolean) {
    this.update({ ...this.todo(), completed: done });
  }

  updateTitle() {
    this.update({ ...this.todo(), title: randText() });
  }

  update(todo: TodoItem) {
    this.todoService.update(todo).subscribe((todoUpdated: TodoItem) => {
      this.updated.emit(todoUpdated);
    });
  }

  delete() {
    this.todoService.delete(this.todo()).subscribe(() => {
      this.deleted.emit(this.todo());
    });
  }
}
