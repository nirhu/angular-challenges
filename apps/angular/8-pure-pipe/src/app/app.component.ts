import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputationPipe } from './computation.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ComputationPipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track person; let index = $index) {
      <div>
        {{ person | appComputation: index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
