import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective<T> implements OnInit {
  userStore = inject(UserStore);

  @Input({ required: true, alias: 'appHasRole' }) roles: Role | Role[] = [];

  constructor(
    private templateRef: TemplateRef<T>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.userStore.user$.subscribe((user) => {
      this.viewContainerRef.clear();
      const roles = Array.isArray(this.roles) ? this.roles : [this.roles];
      if (user?.isAdmin || roles.some((role) => user?.roles.includes(role))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
