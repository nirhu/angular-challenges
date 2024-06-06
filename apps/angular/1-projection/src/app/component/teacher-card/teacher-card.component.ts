import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [items]="store.teachers()"
      (addNewItem)="addNewItem()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" alt="Teacher icon" />

      <ng-template [cardRow]="store.teachers()" let-teacher>
        <app-list-item (deleteItem)="deleteItem(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    CardComponent,
    ListItemComponent,
    NgOptimizedImage,
    AsyncPipe,
    CardRowDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  http = inject(FakeHttpService);
  store = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
