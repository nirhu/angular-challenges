import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WrapFnPipe } from './wrap-fn.pipe';

@Component({
  standalone: true,
  imports: [NgFor, WrapFnPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ showName | wrapFn: person : index }}
      {{ isAllowed | wrapFn: person.age : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(person: { name: string; age: number }, index: number) {
    // very heavy computation
    return `${person.name} (${person.age}) - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
