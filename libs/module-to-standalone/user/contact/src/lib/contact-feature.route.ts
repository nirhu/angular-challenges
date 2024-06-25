import { Route } from '@angular/router';

const contactRoute: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-contact',
    loadChildren: () => import('./create-contact/create-contact.component'),
  },
];

export default contactRoute;
