import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthButtonComponent } from '../../buttons/authButton/auth.button';
import { LogoutButtonComponent } from '../../buttons/logoutButton/logout.button';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../../service/directives/role.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    AuthButtonComponent,
    LogoutButtonComponent,
    RouterLink,
    RoleDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}
  ngOnInit() {
    const hamburger = document.getElementById('hamburger');
    console.log(hamburger);
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
