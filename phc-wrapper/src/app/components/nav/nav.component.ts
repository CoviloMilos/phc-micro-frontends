import { NotificationSchedulerManualService } from './../../_services/notification-scheduler-manual.service';
import { ConfirmDialogComponent } from './../../_shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username: any;
  isFormSubmited: boolean = null;

  constructor(private authService: AuthService,
              private dialogRef: MatDialog,
              private notifyScheduler: NotificationSchedulerManualService) { }

  ngOnInit() {

  }

  loggedIn() {
    if (this.authService.loggedIn()) {
      this.username = this.authService.currentUser.username;
      return true;
    }
    return false;
  }
  
  isAdmin() {
    if(this.loggedIn())
      return this.authService.currentUser.admin == 'True' ? true : false;
    else 
      return false;
  }

  logout() {
    this.authService.logout();
  }

  openConfirmDialog(){
    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      width: '350px',
      data: "Do you want to notify users about their watering period?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.notifyScheduler.manualNotification();
      }
    });
  }

}
