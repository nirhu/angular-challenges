import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [items]="store.students()"
      (addNewItem)="addNewItem()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />

      <ng-template [cardRow]="store.students()" let-student>
        <app-list-item (deleteItem)="deleteItem(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgIf,
    AsyncPipe,
    ListItemComponent,
    CardRowDirective,
  ],
})
export class StudentCardComponent implements OnInit {
  store = inject(StudentStore);
  http = inject(FakeHttpService);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
