import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { PermissionGuard } from './service/guards/permission.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'components/create',
    loadComponent: () =>
      import(
        './pages/components/component-create/component-create.component'
      ).then((m) => m.ComponentCreateComponent),
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      roles: ['admin'],
    },
  },
];