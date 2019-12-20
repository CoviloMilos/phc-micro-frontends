
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FlowerUpdate } from 'src/app/_models/flower.update';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FlowersService } from 'src/app/_services/flowers.service';
import { Flower } from 'src/app/_models/flower';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-flower-dialog',
  templateUrl: './update-flower-dialog.component.html',
  styleUrls: ['./update-flower-dialog.component.css']
})
export class UpdateFlowerDialogComponent implements OnInit {
  flower: FlowerUpdate = Object.create(null);

  updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private flowersService: FlowersService,
              private dialogRef: MatDialogRef<UpdateFlowerDialogComponent>,
              private alertifyService: AlertifyService,
              @Inject(MAT_DIALOG_DATA) public data: Flower) { }

  ngOnInit() {
    this.initreactiveForm();
  }

  initreactiveForm() {
    this.updateForm = this.formBuilder.group({
      nameSer: [this.data.name_ser],
      nameLat: [this.data.name_lat],
      wateringPeriod: [this.data.watering_period],
      description: [this.data.description]
    });
  }

  submitForm() {
    if (this.updateForm.valid) {
      this.flower.name_ser = this.updateForm.value.nameSer;
      this.flower.name_lat = this.updateForm.value.nameLat;
      this.flower.watering_period = this.updateForm.value.wateringPeriod;
      this.flower.description = this.updateForm.value.description;

      console.log(this.flower);

      this.flowersService.updatFlower(this.data.flower_id, this.flower)
        .subscribe((res) => {
          this.alertifyService.success('Flower updated successfully !');
        }, (error: HttpErrorResponse) => {
          this.alertifyService.error('Could not update flower !Error Name: ' + error.name + '. Error message: ' + error.message);
        });
      this.updateForm.reset();
      this.dialogRef.close();
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.updateForm.controls[control].hasError(error);
  }

}
