import { Component } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: `<button
    class="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right  bg-primary text-white md:rounded"
    (click)="auth.loginWithRedirect()"
  >
    Log in
  </button>`,
  standalone: true,
})
export class AuthButtonComponent {
  constructor(public auth: AuthService) {}
}
