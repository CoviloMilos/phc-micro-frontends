import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private dialogRef: MatDialog) { }

  private base = 'https://i.ibb.co';
  imageArch = '/J7dMpgJ/arhc.png';
  images: string[] = ['/GHs91R1/angular.png', '/MfdHMmn/python.png', '/wyMfHR3/docker.png',
  '/3zmnkJb/openshift.png', '/Y2zdm1P/nginx.png', '/hW6hPqh/jenkins.png'];

  ngOnInit(): void {
    this.buildUrl();
  }

  buildUrl() {
    this.images = this.images.map(img => this.base + img);
    this.imageArch = this.base + this.imageArch;
  }

  showImage() {
    const dialogRef = this.dialogRef.open(ImagePreviewComponent, {
      height: 'auto',
      width: '692px'
    });

    dialogRef.afterClosed().subscribe();
  }
}
