import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  standalone: true,
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form #appForm />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  dialog = inject(MatDialog);

  @ViewChild('appForm') appForm: FormComponent | undefined;

  canDeactivate(): Observable<boolean> | boolean {
    if (this.appForm?.form.dirty) {
      return this.dialog
        .open(AlertDialogComponent)
        .afterClosed()
        .pipe(map((result) => !!result));
    }
    return true;
  }
}
