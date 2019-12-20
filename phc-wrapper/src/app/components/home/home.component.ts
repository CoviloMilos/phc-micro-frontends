import { Component, OnInit, Renderer2, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  template: '',
  styles: null
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  parentComponent: HTMLElement = null;

  constructor(private renderer2: Renderer2,
              // tslint:disable-next-line: variable-name
              @Inject(DOCUMENT) private _document,
              private alertifyService: AlertifyService) { }

  ngAfterViewInit(): void {
    try {
      this.parentComponent = document.createElement('parent');
      const usersComponent = document.createElement('phc-users-comp-flowers');
      usersComponent.setAttribute('token', localStorage.getItem('jwt-token'));
      const tempUser: User = JSON.parse(localStorage.getItem('user'));
      const user = {
        user_id: tempUser.user_id.toString(),
        username: tempUser.username,
        email: tempUser.email,
        first_name: tempUser.first_name,
        last_name: tempUser.last_name,
        admin: tempUser.admin
      };
      usersComponent.setAttribute('user', JSON.stringify(user));
      this.parentComponent.appendChild(usersComponent);
      this.renderer2.appendChild(this._document.body, this.parentComponent);
    } catch (error) {
      this.alertifyService.error('Something went wrong. Please try again later.');
    }
  }

  ngOnDestroy(): void {
    this.parentComponent.remove();
  }

}
