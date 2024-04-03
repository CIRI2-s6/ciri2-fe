import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PermissionGuard {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.auth.user$.subscribe((user) => {
      if (!user) return false;
      if (!route.data['roles']) return true;
      const roles = route.data['roles'] as Array<string>;
      const userRoles = user[environment.roleKey];
      if (!userRoles) {
        this.notifierService.notify(
          'error',
          'You do not have permission to access this page'
        );
        this.router.navigate(['/']);
        return false;
      }
      if (!userRoles.some((role: string) => roles.includes(role))) {
        this.notifierService.notify(
          'error',
          'You do not have permission to access this page'
        );
        this.router.navigate(['/']);
      }
      return userRoles.some((role: string) => roles.includes(role));
    });
  }
}
