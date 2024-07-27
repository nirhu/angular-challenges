import { PercentPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HeavyCalculationService } from './heavy-calculation.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  standalone: true,
  imports: [PercentPipe, UnknownPersonComponent],
  providers: [HeavyCalculationService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />
    <button
      class="my-3 w-fit self-center rounded-md border border-white px-4 py-2 text-2xl text-white"
      (click)="discover()">
      Discover
    </button>
    <div class="p-1 text-white">
      Progress: {{ loadingPercentage() / 100 | percent: '1.1-1' }}
    </div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent {
  private heavyCalculationService = inject(HeavyCalculationService);
  private readonly workerLoadingPercentage = signal(0);

  readonly loadingPercentage = computed(
    () =>
      this.workerLoadingPercentage() ||
      this.heavyCalculationService.loadingPercentage(),
  );

  discover() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(
        new URL('./heavy-calculation.worker', import.meta.url),
      );
      worker.onmessage = ({ data }) => {
        this.workerLoadingPercentage.set(data);
      };
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      this.heavyCalculationService.startLoading();
    }
  }
}
