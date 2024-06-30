import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingControlComponent,
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  cd = inject(ChangeDetectorRef);

  onChange = (index: number) => {};
  onTouched = () => {};

  value: number | null = null;
  disabled = false;

  setRating(index: number): void {
    if (!this.disabled) {
      this.value = index + 1;
      this.onChange(this.value);
    }
  }

  isStarActive(index: number, value: number | null): boolean {
    return !this.disabled && value ? index < value : false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.cd.markForCheck();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
