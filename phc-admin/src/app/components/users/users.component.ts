import { AlertifyService } from './../../_services/alertify.service';
import { UsersService } from './../../_services/users.service';
import { User } from './../../_models/user';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { ConfirmDialogComponent } from '../../_shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('token') token: string;
  users: User[];
  // Mat Table
  displayedColumns: string[] = ['userId', 'fName', 'lName', 'username', 'email', 'isAdmin', 'actions'];
  dataSource: MatTableDataSource<any> = null;

  // MatPaginator
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private usersService: UsersService,
              private alertifyService: AlertifyService,
              private dialogRef: MatDialog) { }

  ngOnInit(): void {
    if (this.token) {
      this.usersService.setupHeaders(this.token);
      this.getUsers();
    } else {
      this.alertifyService.error('Something went wrong. Please try again later!');
    }
  }

  // Table filter, paginator, sort
  applyFilter(filterValue: string) { this.dataSource.filter = filterValue.trim().toLowerCase(); }
  setPageSizeOptions(setPageSizeOptionsInput: string) { this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str); }

  openDialogCreate() {
    const dialogRef = this.dialogRef.open(CreateUserDialogComponent, {
      height: '730px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  openDialogEdit(user: User) {
    const dialogRef = this.dialogRef.open(UpdateUserDialogComponent, {
      height: '730px',
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  handleDelete(taskId: number) {
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'Do you want to delete this user?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(taskId)
          .subscribe((res) => {
            this.alertifyService.success('User deleted successfully !');
          }, (error: HttpErrorResponse) => {
            // tslint:disable-next-line: max-line-length
            this.alertifyService.error('Something went wrong. Could not delete user. Error Name: ' + error.name + '. Error message: ' + error.message);
          });
        // tslint:disable-next-line: triple-equals
        this.dataSource.data = this.dataSource.data.filter(el => el.user_id != taskId);
      }
    });
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe((usersData: User[]) => {
        this.users = usersData;
        this.users = Array.from(this.users).sort((user1, user2) => user2.user_id - user1.user_id);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.length = this.users.length == null ? 0 : this.users.length;
      }, (error: HttpErrorResponse) => {
        this.alertifyService.error('Could not retrive users from Users API. Error: ' + error.message);
      });
  }

  /*updateTable(user: User) {
    this.users = [user].concat(this.users);
    this.dataSource.data.push(user);
    this.dataSource.paginator = this.paginator;
    this.length = this.users.length == null ? 0 : this.users.length;
  }*/
}

