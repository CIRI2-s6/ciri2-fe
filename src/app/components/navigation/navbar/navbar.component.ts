import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthButtonComponent } from '../../buttons/authButton/auth.button';
import { LogoutButtonComponent } from '../../buttons/logoutButton/logout.button';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../../service/directives/role.directive';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    AuthButtonComponent,
    LogoutButtonComponent,
    RouterLink,
    RoleDirective,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isAuthenticated = toSignal(this.auth.isAuthenticated$);

  constructor(public auth: AuthService) {}
  ngOnInit() {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
      hamburger.onclick = function toggleMenu() {
        const navToggle = document.getElementsByClassName('toggle');
        for (let i = 0; i < navToggle.length; i++) {
          const item = navToggle.item(i);
          if (item) {
            item.classList.toggle('hidden');
          }
        }
      };
    }
  }
}
