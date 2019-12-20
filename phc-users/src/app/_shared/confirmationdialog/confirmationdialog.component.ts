import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }

  onNoClick() {
  this.dialogRef.close(false);
  }

  onYesClick() {
  this.dialogRef.close(true);
  }

}
