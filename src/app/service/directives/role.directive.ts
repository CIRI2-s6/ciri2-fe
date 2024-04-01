import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Directive({
  selector: '[role]',
  standalone: true,
})
export class RoleDirective {
  @Input() role: string[];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService
  ) {
    this.role = [];
  }

  ngOnInit() {
    return this.auth.user$.subscribe((user) => {
      if (!user) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        return false;
      }
      const userRoles = user['http://api.ciri2.com/roles'];
      if (userRoles.some((role: any) => this.role.includes(role))) {
        return true;
      }
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      return false;
    });
  }
}
