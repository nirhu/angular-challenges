import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [items]="store.cities()"
      (addNewItem)="addNewItem()"
      class="bg-light-purple">
      <img src="assets/img/city.png" width="200px" />

      <ng-template [cardRow]="store.cities()" let-city>
        <app-list-item (deleteItem)="deleteItem(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-purple {
        background-color: rgba(0, 0, 250, 0.1);
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
export class CityCardComponent implements OnInit {
  store = inject(CityStore);
  http = inject(FakeHttpService);

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.cities.set(cities));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
