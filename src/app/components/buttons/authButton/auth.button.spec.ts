import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthButtonComponent } from './auth.button';
import { AuthService } from '@auth0/auth0-angular';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      imports: [AuthButtonComponent],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginWithRedirect method on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(authService.loginWithRedirect).toHaveBeenCalled();
  });

  it('should render the button with correct text', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Log in');
  });
});
