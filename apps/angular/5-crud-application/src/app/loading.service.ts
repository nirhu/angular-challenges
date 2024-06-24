import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  apiPath = signal<string[]>([]);

  isLoading(url: string): boolean {
    return !!this.apiPath().find((u) => u.endsWith(url));
  }
}
