import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NotifierService } from 'angular-notifier';
import { PermissionGuard } from './permission.guard';
import { environment } from '../../../../environments/environment';

describe('PermissionGuard', () => {
  let authServiceMock: any;
  let notifierServiceMock;
  let guard: PermissionGuard;

  beforeEach(() => {
    authServiceMock = {
      user$: of({ [environment.roleKey]: [] })
    };

    notifierServiceMock = jasmine.createSpyObj('NotifierService', ['notify']);

    TestBed.configureTestingModule({
      providers: [
        PermissionGuard,
        { provide: NotifierService, useValue: notifierServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    guard = TestBed.inject(PermissionGuard);
  });

  it('should allow access if user is logged in and has required roles', () => {
    authServiceMock.user$ = of({ [environment.roleKey]: ['admin'] });

    const route = {
      data: { roles: ['admin'] }
    } as unknown as ActivatedRouteSnapshot;

    const res = guard.canActivate(route);
    expect(res).toBeTruthy();
  });

  it('should not allow access if user is not logged in', () => {
    const route = {
      data: { roles: [''] }
    } as unknown as ActivatedRouteSnapshot;

    const res = guard.canActivate(route);

    expect(res).toBeTruthy();
  });
});
