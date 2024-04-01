import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'login',
      'logout',
      'getUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ActivatedRoute, useValue: { params: of({ id: 'testId' }) } }, // Mock ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

it('should toggle menu when hamburger is clicked', () => {
  // Arrange
  const hamburger = document.createElement('div');
  hamburger.id = 'hamburger';
  document.body.appendChild(hamburger);
  const navToggle = document.createElement('div');
  navToggle.classList.add('toggle');
  document.body.appendChild(navToggle);

  // Act
  hamburger.click();

  // Assert
  expect(navToggle.classList.contains('hidden')).toBe(false);

  // Clean up
  document.body.removeChild(hamburger);
  document.body.removeChild(navToggle);
});
