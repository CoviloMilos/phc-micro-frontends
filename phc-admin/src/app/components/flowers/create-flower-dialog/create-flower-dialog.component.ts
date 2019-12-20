import { FlowerCreate } from './../../../_models/flower.create';
import { FlowersService } from './../../../_services/flowers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-flower-dialog',
  templateUrl: './create-flower-dialog.component.html',
  styleUrls: ['./create-flower-dialog.component.css']
})
export class CreateFlowerDialogComponent implements OnInit {

  flower: FlowerCreate = {
    name_ser: '',
    name_lat: '',
    watering_period: '',
    description: ''
  };

  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private flowersService: FlowersService,
              private dialogRef: MatDialogRef<CreateFlowerDialogComponent>,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.createForm = this.formBuilder.group({
      nameSer: ['', [Validators.required]],
      nameLat: ['', [Validators.required]],
      wateringPeriod: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.createForm.valid) {
      this.flower.name_lat = this.createForm.value.nameLat;
      this.flower.name_ser = this.createForm.value.nameSer;
      this.flower.description = this.createForm.value.description;
      this.flower.watering_period = this.createForm.value.wateringPeriod;

      this.flowersService.createFlower(this.flower)
        .subscribe((res) => {
          this.alertifyService.success('Flower added successfully !');
        }, (error: HttpErrorResponse) => {
          this.alertifyService.error('Error trying to create flower. Error Name: ' + error.name + '. Error message: ' + error.message);
        });
      this.dialogRef.close();
      this.createForm.reset();
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.createForm.controls[control].hasError(error);
  }
}
