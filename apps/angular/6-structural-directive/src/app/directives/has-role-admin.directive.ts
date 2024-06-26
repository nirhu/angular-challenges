import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserStore } from '../user.store';

@Directive({
  selector: '[appHasRoleAdmin]',
  standalone: true,
})
export class HasRoleAdminDirective<T> implements OnInit {
  userStore = inject(UserStore);

  @Input({ required: true, alias: 'appHasRoleAdmin' }) showForAdmin = false;

  constructor(
    private templateRef: TemplateRef<T>,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.userStore.user$.subscribe((user) => {
      this.viewContainerRef.clear();
      if (user?.isAdmin && this.showForAdmin) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
