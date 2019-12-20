import { User2FlowerLocalService } from './../../_services/user-2-flower-local.service';
import { UsertoflowerService } from './../../_services/usertoflower.service';
import { Component, OnInit, Input } from '@angular/core';
import { PlantPreviewComponent } from './plant-preview/plant-preview.component';
import { FormGroup } from '@angular/forms';
import { FlowerPreview } from 'src/app/_models/flowerpreview';
import { MatDialog } from '@angular/material';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FlowerService } from 'src/app/_services/flower.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('token') token: string;

  // flowers preview
  flowersPreview: FlowerPreview[];
  flowerNames: any[];
  // tslint:disable-next-line: max-line-length
  images: string[] = ['/mqxKs8P/chamaedorea-elegans.jpg', '/C26RmPP/dragon-tree.jpg', '/XL526sr/ficus-benjamin.jpg', '/Yh90mG0/spathiphyllum.jpg', '/MVB40fQ/areca-palma.jpg', '/jfZkcdK/schefflera.jpg' ];
  private base = 'https://i.ibb.co';

  // form
  selectedFlowerName = '';
  selectedDate = '';
  plantForm: FormGroup;
  constructor(private flowersService: FlowerService,
              private dialogRef: MatDialog,
              private alertifyService: AlertifyService) {
  }

  ngOnInit(): void {
    //this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTA3IiwiZmlyc3RfbmFtZSI6Ik1pbG9zIiwibGFzdF9uYW1lIjoiQ292aWxvIiwidXNlcm5hbWUiOiJtY292aWxvIiwiZW1haWwiOiJtaWxvcy5jb3ZpbG9AZGV2b3RlYW0uY29tIiwiYWRtaW4iOiJUcnVlIiwiZXhwIjoxNTc1NDY3NDU0fQ.co8V6CINVT6olmJ6IxxIbAcHemAZLXBLlaposkylFEE';
    if (this.token) {
      this.flowersService.setupHeaders(this.token);
      this.getFlowers();
    } else {
      this.alertifyService.error('Something went wrong. Please try again later!');
    }
  }

  openPlantPreviewDialog(flower: any) {
    const dialogRef = this.dialogRef.open(PlantPreviewComponent, {
      width: '500px',
      data: flower
    });

    dialogRef.afterClosed().subscribe();
  }

  buildUrl() {
    this.images = this.images.map(img => this.base + img);
  }

  getFlowers() {
    this.buildUrl();
    this.flowersService.getFlowers()
    .subscribe(response => {
      this.flowersPreview = response;
      this.flowersPreview.forEach(f => {
        f.imageUrl = this.mapImage(f.name_lat.substring(0, 3).toLowerCase());
      });
      this.flowerNames = this.flowersPreview.map(f => f.name_lat);
    }, () => {
      this.alertifyService.error('Failed to display flowers. Please try again later');
    });
  }

  mapImage(name) {
    let image: string = this.base + '/Yh90mG0/spathiphyllum.jpg';
    this.images.forEach(img => {
      if (img.substring(this.base.length + 9, img.length - 4).includes(name)) {
        image = img;
      }
    });
    return image;
  }
}

