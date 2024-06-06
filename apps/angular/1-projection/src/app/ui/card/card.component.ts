import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of items(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  addNewItem = output();

  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });
}
