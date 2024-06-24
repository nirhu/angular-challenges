import {
  Directive,
  effect,
  inject,
  input,
  ViewContainerRef,
} from '@angular/core';
import { LoadingService } from './loading.service';

@Directive({
  selector: '[appButtonLoadingOverlay]',
  standalone: true,
})
export class ButtonLoadingOverlayDirective {
  appButtonLoadingOverlay = input.required<string>();

  viewRef = inject(ViewContainerRef);
  loaderService = inject(LoadingService);

  constructor() {
    effect(() => {
      const hostElement = this.viewRef.element.nativeElement as HTMLElement;
      let buttons: HTMLButtonElement[];

      if (hostElement instanceof HTMLButtonElement) {
        buttons = [hostElement];
      } else {
        buttons = Array.from(
          hostElement.getElementsByTagName('button'),
        ) as HTMLButtonElement[];
      }

      buttons.forEach((button) => {
        button.disabled = this.loaderService.isLoading(
          this.appButtonLoadingOverlay(),
        );
      });
    });
  }
}
