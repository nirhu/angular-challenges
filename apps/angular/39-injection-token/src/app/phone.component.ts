import { Component } from '@angular/core';
import { PHONE_TIMER, TIMER } from './data';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
  providers: [{ provide: TIMER, useValue: PHONE_TIMER }],
})
export default class PhoneComponent {}
