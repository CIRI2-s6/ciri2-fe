import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NotifierService } from 'angular-notifier';

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
      const userRoles = user['http://api.ciri2.com/roles'];
      console.log(userRoles.some((role: any) => roles.includes(role)));
      if (!userRoles.some((role: any) => roles.includes(role))) {
        this.notifierService.notify(
          'error',
          'You do not have permission to access this page'
        );
        console.log('You do not have permission to access this page');
        this.router.navigate(['/']);
      }
      return userRoles.some((role: any) => roles.includes(role));
    });
  }
}
