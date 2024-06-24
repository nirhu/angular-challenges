import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type TodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(
      'https://jsonplaceholder.typicode.com/todos',
    );
  }

  update(todo: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify(todo),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete(todo: TodoItem): Observable<TodoItem> {
    return this.http.delete<TodoItem>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }
}
