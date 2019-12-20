import { UserUpdate } from './../../_models/user.update';
import { UsersService } from './../../_services/users.service';
import { UsertoflowerService } from './../../_services/usertoflower.service';
import { FlowerService } from './../../_services/flower.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('token') token: any;
  // tslint:disable-next-line: no-input-rename
  /*@Input('user2flower') user2flower: any;
  // tslint:disable-next-line: no-input-rename
  @Input('flowers') flowers: any;
  // tslint:disable-next-line: no-input-rename
  @Input('ids') ids: any;*/

  user: User = {
    user_id: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    admin: ''
  };

  private jwtHelper = new JwtHelperService();
  private userUpdate: UserUpdate = Object.create(null);
  profileForm: FormGroup;

  constructor(private alertifyService: AlertifyService,
              private formBuilder: FormBuilder,
              private flowersService: FlowerService,
              private userToFlowerService: UsertoflowerService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.initReactiveForm();
    // tslint:disable-next-line: max-line-length
    //this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTA3IiwiZmlyc3RfbmFtZSI6Ik1pbG9zIiwibGFzdF9uYW1lIjoiQ292aWxvIiwidXNlcm5hbWUiOiJtY292aWxvIiwiZW1haWwiOiJtaWxvcy5jb3ZpbG9AZGV2b3RlYW0uY29tIiwiYWRtaW4iOiJUcnVlIiwiZXhwIjoxNTc1NzEyMTYyfQ.pPMj-1vgxw4fmt-y-a94r9n2RWtx-dIGTbHQy0uGABI';
    /*this.user2flower = {
      date_of_inception: '2019-10-14',
      email: true,
      flower_id: '18',
      user2flower_id: '65',
      user_id: '107'
    };
    this.ids = '29,19,20,21,23,18,22,34,33';
    // tslint:disable-next-line: max-line-length
    this.flowers = 'Areca Palma,Chamaedorea elegans,Dracaena,Ficus Benjamin,Spathiphyllum,Chrysalidocarpus lutescens,Schefflera,Crassula ovata,testWatering';*/

    if (this.token) {
      this.flowersService.setupHeaders(this.token);
      this.userToFlowerService.setupHeaders(this.token);
      this.usersService.setupHeaders(this.token);

      const tokenDecoded = this.jwtHelper.decodeToken(this.token);

      this.user.username = tokenDecoded.username;
      this.user.email = tokenDecoded.email;
      this.user.first_name = tokenDecoded.first_name;
      this.user.last_name = tokenDecoded.last_name;
      this.user.admin = tokenDecoded.admin;
      this.user.user_id = tokenDecoded.user_id;

      this.profileForm.controls.firstName.setValue(this.user.first_name);
      this.profileForm.controls.lastName.setValue(this.user.last_name);
      this.profileForm.controls.username.setValue(this.user.username);
      this.profileForm.controls.email.setValue(this.user.email);

    } else {
      this.alertifyService.error('Something went wrong. Please try again later');
    }
  }

  initReactiveForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.profileForm.controls[control].hasError(error);
  }

  submitForm() {
    this.alertifyService.warning('This functionality isn\'t working right now.');
    /*if (this.profileForm.valid) {

      this.userUpdate.first_name = this.profileForm.value.firstName;
      this.userUpdate.last_name = this.profileForm.value.lastName;
      this.userUpdate.email = this.profileForm.value.email;
      this.userUpdate.username = this.profileForm.value.username;
      this.userUpdate.admin = this.user.admin;

      this.usersService.updateUser(Number(this.user.user_id), this.userUpdate)
        .subscribe(() => {
          this.alertifyService.success('Successful update!');
          this.user.email = this.userUpdate.email;
          this.user.username = this.userUpdate.username;
          this.user.first_name = this.userUpdate.first_name;
          this.user.last_name = this.userUpdate.last_name;

        }, (error) => {
          if(error.status == 422) {
            this.alertifyService.error('User with ' + this.user.username + ' username already exists!');
          }
          else {
            this.alertifyService.error('Failed registartion. Please try later again.');
          }
        });
    }*/
  }
}
