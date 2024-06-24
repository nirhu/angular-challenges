import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonLoadingOverlayDirective } from './button-loading-overlay.directive';
import { TodoItemComponent } from './todo-item.component';
import { TodoItem, TodoService } from './todo.service';

// TODO add components store (ngRx, rxAngular)

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TodoItemComponent,
    ButtonLoadingOverlayDirective,
  ],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <app-todo-item
        [todo]="todo"
        (updated)="update($event)"
        (deleted)="delete($event)"></app-todo-item>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);
  todos = signal<TodoItem[]>([]);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => this.todos.set(todos));
  }

  delete(todo: TodoItem) {
    this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
  }

  update(todo: TodoItem) {
    this.todos.update((todos) => {
      const index = todos.findIndex((t) => t.id === todo.id)!;
      todos[index] = todo;
      return [...todos];
    });
  }
}
