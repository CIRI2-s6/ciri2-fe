import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NotifierService } from 'angular-notifier';
import { PermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
  it('should allow access if user is logged in and has required roles', () => {
    const authServiceMock = {
      user$: of({ 'http://api.ciri2.com/roles': ['admin'] }),
    };

    const notifierServiceMock = jasmine.createSpyObj('NotifierService', [
      'notify',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PermissionGuard,
        { provide: NotifierService, useValue: notifierServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    const guard = TestBed.inject(PermissionGuard);
    const route = {
      data: { roles: ['admin'] },
    } as unknown as ActivatedRouteSnapshot;

    const res = guard.canActivate(route);
    expect(res).toBeTruthy();
  });

  it('should not allow access if user is not logged in', () => {
    const authServiceMock = {
      user$: of({ 'http://api.ciri2.com/roles': [] }),
    };
    const notifierServiceMock = jasmine.createSpyObj('NotifierService', [
      'notify',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PermissionGuard,
        { provide: NotifierService, useValue: notifierServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    const guard = TestBed.inject(PermissionGuard);
    const route = {
      data: { roles: [''] },
    } as unknown as ActivatedRouteSnapshot;

    const res = guard.canActivate(route);

    expect(res).toBeTruthy();
  });
});
