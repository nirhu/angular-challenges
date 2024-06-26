import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { map } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRoles(['MANAGER'])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/guest.component').then(
        (m) => m.GuestDashboardComponent,
      ),
  },
];

const isAdmin = (userStore = inject(UserStore)) => {
  return userStore.user$.pipe(map((user) => user?.isAdmin));
};

const hasRoles = (roles: Role[], userStore = inject(UserStore)) => {
  return userStore.user$.pipe(
    map((user) => roles.some((role) => user?.roles.includes(role))),
  );
};
