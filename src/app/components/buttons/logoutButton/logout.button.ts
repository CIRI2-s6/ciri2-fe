import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  template: `
    <button
      class="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-error text-white md:rounded"
      (click)="logout()"
    >
      Log out
    </button>
  `,
  standalone: true
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth: AuthService
  ) {}

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}
