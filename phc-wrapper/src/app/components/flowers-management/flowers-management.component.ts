import { Component, OnInit, Renderer2, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-flowers-management',
  template: '',
  styles: null
})
export class FlowersManagementComponent implements AfterViewInit, OnDestroy {

  parentComponent: HTMLElement = null;

  constructor(private renderer2: Renderer2,
              @Inject(DOCUMENT) private _document,
              private alertifyService: AlertifyService) { }
  
  ngAfterViewInit(): void {
    try {
      this.parentComponent = document.createElement('parent');
      const usersComponent = document.createElement('phc-admin-comp-flowers');
      usersComponent.setAttribute('token', localStorage.getItem('jwt-token'));
      this.parentComponent.appendChild(usersComponent);
      this.renderer2.appendChild(this._document.body, this.parentComponent);
    } catch (error) {
      this.alertifyService.error('Something went wrong. Please try again later.')
    }
  }

  ngOnDestroy(): void {
    this.parentComponent.remove();
  }

}
