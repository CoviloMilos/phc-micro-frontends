import { ConfirmDialogComponent } from './../../_shared/confirm-dialog/confirm-dialog.component';
import { UpdateFlowerDialogComponent } from './update-flower-dialog/update-flower-dialog.component';
import { CreateFlowerDialogComponent } from './create-flower-dialog/create-flower-dialog.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FlowersService } from './../../_services/flowers.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Flower } from 'src/app/_models/flower';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css']
})
export class FlowersComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('token') token: string;

  displayedColumns: string[] = ['flowerId', 'nameSer', 'nameLat', 'wateringPeriod', 'description', 'actions'];
  dataSource: MatTableDataSource<any> = null;
  flowers: Flower[]; s;

  // MatPaginator
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private flowersService: FlowersService,
              private alertifyService: AlertifyService,
              private dialogRef: MatDialog) { }

  ngOnInit(): void {
    if (this.token) {
      this.flowersService.setupHeaders(this.token);
      this.getFlowers();
    } else {
      this.alertifyService.error('Something went wrong. Please try again later!');
    }
  }

  // filter data in table
  applyFilter(filterValue: string) { this.dataSource.filter = filterValue.trim().toLowerCase(); }
  setPageSizeOptions(setPageSizeOptionsInput: string) { this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str); }

  openDialogCreate() {
    const dialogRef = this.dialogRef.open(CreateFlowerDialogComponent, {
      height: '670px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFlowers();
    });
  }

  openDialogEdit(flower: Flower) {

    const dialogRef = this.dialogRef.open(UpdateFlowerDialogComponent, {
      height: '670px',
      width: '400px',
      data: flower
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFlowers();
    });

  }

  handleDelete(flowerId: number) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'Do you want to delete this flower?'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flowersService.deleteFlower(flowerId)
          .subscribe((res) => {
            this.alertifyService.success('Flower deleted successfully!');
          }, (error: HttpErrorResponse) => {
            // tslint:disable-next-line: max-line-length
            this.alertifyService.error('Something went wrong. Could not delete flower. Error Name: ' + error.name + '. Error message: ' + error.message);
          });

        // tslint:disable-next-line: triple-equals
        this.dataSource.data = this.dataSource.data.filter(el => el.flower_id != flowerId);
      }
    });
  }

  getFlowers() {
    this.flowersService.getFlowers()
        .subscribe((flowersData) => {
          this.flowers = flowersData;
          this.flowers = Array.from(this.flowers).sort((flower1, flower2) => Number(flower2.flower_id) - Number(flower1.flower_id));
          this.dataSource = new MatTableDataSource(this.flowers);
          this.dataSource.paginator = this.paginator;
          this.length = flowersData.length == null ? 0 : flowersData.length;
        }, (error: HttpErrorResponse) => {
          // tslint:disable-next-line: max-line-length
          this.alertifyService.error('Could not retrive flowers from Users API. Error Name: ' + error.name + '. Error message: ' + error.message);
        });
  }

}
