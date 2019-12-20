import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
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