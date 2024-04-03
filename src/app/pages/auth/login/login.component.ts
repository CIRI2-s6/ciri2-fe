import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthButtonComponent } from '../../../components/buttons/authButton/auth.button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthButtonComponent],
  template: `<app-auth-button />`,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {}
