import { FlowersService } from './../../_services/flowers.service';
import { Router } from '@angular/router';
import { UserToFlowerInfo } from './../../_models/userToFlowerInfo';
import { UserToFlowerService } from './../../_services/user-to-flower.service';
import { Component, OnInit, Inject, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/_services/auth.service';
import { FlowerName } from 'src/app/_models/flower.name';

@Component({
  selector: 'app-profile',
  template: '',
  styles: null
})
export class ProfileComponent implements AfterViewInit, OnDestroy {

  parentComponent: HTMLElement = null;
  private userToFlowerInfo: UserToFlowerInfo = {
    date_of_inception: '',
    email: false,
    name_lat: '',
    user2flower_id: '',
    watering_period: ''
  };
  private flowerNames: string[];
  private flowerIds: string[];

  constructor(private renderer2: Renderer2,
              // tslint:disable-next-line: variable-name
              @Inject(DOCUMENT) private _document,
              private alertifyService: AlertifyService,
              private userToFlowerService: UserToFlowerService,
              private authService: AuthService,
              private router: Router,
              private flowersService: FlowersService) { }

  ngAfterViewInit(): void {
    try {
      this.createCustomComponent();
    } catch (error) {
      this.handleErrorResponse();
    }
    /*this.userToFlowerService.getUserToFlower(this.authService.currentUser.user_id)
      .subscribe(response => {
        if (response.msg) {

        } else {
          this.userToFlowerInfo = response[0];
        }
      }, () => {
        this.handleErrorResponse();
      }, () => {

        this.flowersService.getFlowers()
        .subscribe((response) => {
          this.flowerNames = response.map(f => f.name_lat);
          this.flowerIds = response.map(id => id.flower_id);
        }, () => {
          this.handleErrorResponse();
        }, () => {
          try {
            this.createCustomComponent(this.userToFlowerInfo, this.flowerNames, this.flowerIds);
          } catch (error) {
            this.handleErrorResponse();
          }
        });

      });*/
  }

  ngOnDestroy(): void {
    this.parentComponent.remove();
  }

  private createCustomComponent() {
    this.parentComponent = document.createElement('parent');
    const usersComponent = document.createElement('phc-users-comp-profile');
    usersComponent.setAttribute('token', localStorage.getItem('jwt-token'));
    console.log(localStorage.getItem('jwt-token'));
    // usersComponent.setAttribute('user2flower', JSON.stringify(user));
    // usersComponent.setAttribute('flowers', flowers.join());
    // usersComponent.setAttribute('ids', ids.join());
    this.parentComponent.appendChild(usersComponent);
    this.renderer2.appendChild(this._document.body, this.parentComponent);
  }

  private handleErrorResponse() {
    this.alertifyService.error('Something went wrong. Please try again later.');
    this.router.navigate(['/home']);
  }

}
