import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FlowerPreview } from 'src/app/_models/flowerpreview';

@Component({
  selector: 'app-plant-preview',
  templateUrl: './plant-preview.component.html',
  styleUrls: ['./plant-preview.component.css']
})
export class PlantPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FlowerPreview) { }

  ngOnInit() {
  }

}
