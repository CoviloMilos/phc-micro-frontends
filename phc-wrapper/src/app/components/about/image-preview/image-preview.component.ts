import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ImagePreviewComponent>) { }

  ngOnInit() {
  }

}
