import { AlertifyService } from './../../../_services/alertify.service';
import { FlowerService } from 'src/app/_services/flower.service';
import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserToFlowerUpdate } from 'src/app/_models/userToFlowerUpdate';
import { UserToFlowerInfo } from 'src/app/_models/userToFlowerInfo';
import { UserToFlower } from 'src/app/_models/usertoflower';
import { UsertoflowerService } from 'src/app/_services/usertoflower.service';
import { FlowerPreview } from 'src/app/_models/flowerpreview';
import { User } from 'src/app/_models/user';
import { FlowerName } from 'src/app/_models/flower.name';
import { User2FlowerLocalService } from 'src/app/_services/user-2-flower-local.service';

@Component({
  selector: 'app-register-plant',
  templateUrl: './register-plant.component.html',
  styleUrls: ['./register-plant.component.css']
})
export class RegisterPlantComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('user') user: User = {
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    admin: '',
  };
  // tslint:disable-next-line: no-input-rename
  /*@Input('flowers') flowers: any;
  // tslint:disable-next-line: no-input-rename
  @Input('user2flower') user2flower: any;
  // tslint:disable-next-line: no-input-rename
  @Input('ids') ids: any;*/

  // form
  // flowerIds: any[];
  flowerNames: any[];
  flowersPreview: FlowerPreview[];

  selectedFlowerName = '';
  selectedDate = '';
  plantForm: FormGroup;
  userToFlower: UserToFlower = {
    email: false,
    user_id: '',
    flower_id: '',
    date_of_inception: ''
  };

  title = 'Choose your plant';
  subtitle = 'so we could take care of your watering period.';
  submitBtn = 'Send';

  isPlantRegistered: boolean = null;

  userToFlowerInfo: UserToFlowerInfo = {
    name_lat: '',
    date_of_inception: '',
    email: true,
    watering_period: '',
    user2flower_id: ''
  };

  userToFlowerUpdate: UserToFlowerUpdate = {
    email: false,
    date_of_inception: '',
    flower_id: ''
  };

  constructor(private formBuilder: FormBuilder,
              private userToFlowerService: UsertoflowerService,
              private flowersService: FlowerService,
              private alertifyService: AlertifyService,
              private user2flowerLocalService: User2FlowerLocalService) {
  }

  ngOnInit() {
    // tslint:disable-next-line: triple-equals
    if (this.user.user_id != '') {
      /*try {
        this.flowerNames = this.flowers.toString().split(',');
        this.flowerIds = this.ids.toString().split(',');

        this.userToFlowerInfo = this.user2flower;
        this.initPlantFormWithFields(this.userToFlowerInfo);
      } catch (error) {
        this.alertifyService.error('Something went wrong. Please try again later');
      }*/
      this.getFlowersPreview();
      this.initPlantForm();
    } else {
      this.alertifyService.error('Something went wrong. Please try again later');
    }
    this.initPlantForm();
  }

  // tslint:disable-next-line: variable-name
  getUserToFlower(user_id: any) {
    this.userToFlowerService.getUserToFlower(user_id)
      .subscribe((response) => {
        this.userToFlowerInfo = response[0];
        if (response.msg) {
          this.userToFlowerInfo = {
            name_lat: '',
            date_of_inception: '',
            email: true,
            watering_period: '',
            user2flower_id: ''
          };
        } else {
          this.userToFlowerInfo.email = response[0].email;
          this.userToFlowerInfo.date_of_inception = response[0].date_of_inception;
          this.userToFlowerInfo.user2flower_id = response[0].user2flower_id;
          this.userToFlowerInfo.name_lat = this.flowersPreview.filter(flower =>
              flower.flower_id === response[0].flower_id)[0].name_lat;
          this.userToFlowerInfo.watering_period = this.flowersPreview.filter(flower =>
             flower.flower_id === response[0].flower_id)[0].watering_period.toString();
          this.plantForm.controls.plant.setValue(this.flowersPreview.filter(flower =>
             flower.flower_id === response[0].flower_id)[0].name_lat);
          this.plantForm.controls.date.setValue(this.userToFlowerInfo.date_of_inception);
          this.plantForm.controls.emailNotification
            .setValue(String(this.userToFlowerInfo.email)
            .charAt(0).toUpperCase() + String(this.userToFlowerInfo.email).slice(1));
          this.title = 'This is your plant';
          this.subtitle = 'You can update these fields whenever!';
          this.submitBtn = 'Update';
        }
      }, () => {
        this.alertifyService.error('Something went wrong. Please try again later.');
      });
  }

  getFlowersPreview() {
    console.log(this.flowersService.httpOptions.headers);
    this.flowersService.getFlowers()
      .subscribe((response) => {
        this.flowerNames = response.map(f => f.name_lat);
        this.flowersPreview = response;
      }, () => {
        this.alertifyService.error('Something went wrong. Please try again later.');
      }, () => {
        this.getUserToFlower(this.user.user_id);
      });
  }

  initPlantForm() {
    this.plantForm = this.formBuilder.group({
      plant: ['', Validators.required],
      date: ['', Validators.required],
      emailNotification: ['True'],
    });
  }

  /*initPlantFormWithFields(user: UserToFlowerInfo) {
    this.plantForm = this.formBuilder.group({
      plant: ['', Validators.required],
      date: [user.date_of_inception, Validators.required],
      emailNotification: [String(user.email)
        .charAt(0).toUpperCase() + String(this.userToFlowerInfo.email).slice(1)],
    });
  }*/


  submitForm() {
    if (this.plantForm.valid) {
      try {
        const date = new Date(this.plantForm.value.date).toLocaleDateString('en-US').split('/');
        const dateOfInception = date[2] + '-' + date[0] + '-' + date[1];
        const email = this.plantForm.value.emailNotification === 'False' ? false : true;
        const flowerId = this.flowersPreview.filter(f => f.name_lat === this.plantForm.value.plant)[0].flower_id;

        if (this.userToFlowerInfo.name_lat === '') {
          this.userToFlower.date_of_inception = dateOfInception;
          this.userToFlower.email = email;
          this.userToFlower.flower_id = flowerId;
          this.userToFlower.user_id = this.user.user_id.toString();
          this.userToFlowerService.createUserToFlower(this.userToFlower);
          this.title = 'This is your plant';
          this.subtitle = 'You can update these fields whenever!';
          this.submitBtn = 'Update';
        } else {
          this.userToFlowerUpdate.email = email;
          this.userToFlowerUpdate.flower_id = flowerId;
          this.userToFlowerUpdate.date_of_inception = dateOfInception;
          this.userToFlowerService.updateUserToFlower(this.userToFlowerUpdate, this.userToFlowerInfo.user2flower_id);
        }

      } catch (error) {
        this.alertifyService.error('Something went wrong. Please try again later.');
      }

    }
  }

  errorHandling = (control: string, error: string) => {
    return this.plantForm.controls[control].hasError(error);
  }

}
