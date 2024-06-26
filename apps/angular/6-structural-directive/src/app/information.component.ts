import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleAdminDirective } from './directives/has-role-admin.directive';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, HasRoleDirective, HasRoleAdminDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *appHasRoleAdmin="true">visible only for super admin</div>
    <div *appHasRole="'MANAGER'">visible if manager</div>
    <div *appHasRole="['MANAGER', 'READER']">
      visible if manager and/or reader
    </div>
    <div *appHasRole="['MANAGER', 'WRITER']">
      visible if manager and/or writer
    </div>
    <div *appHasRole="'CLIENT'">visible if client</div>
    <div>visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  user$ = this.userStore.user$;
  constructor(private userStore: UserStore) {}
}
