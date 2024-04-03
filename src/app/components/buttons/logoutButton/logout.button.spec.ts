import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutButtonComponent } from './logout.button';

describe('AuthButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [LogoutButtonComponent],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logoutWithRedirect method on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should render the button with correct text', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Log out');
  });
});
