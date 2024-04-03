import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[role]',
  standalone: true
})
export class RoleDirective implements OnInit {
  @Input() role: string[];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService
  ) {
    this.role = [];
  }

  ngOnInit() {
    if (!this.auth.user$) return false;
    return this.auth.user$.subscribe((user) => {
      if (!user) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        return false;
      }
      const userRoles = user[environment.roleKey];
      if (!userRoles) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        return false;
      }
      if (userRoles.some((role: string) => this.role.includes(role))) {
        return true;
      }
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      return false;
    });
  }
}
