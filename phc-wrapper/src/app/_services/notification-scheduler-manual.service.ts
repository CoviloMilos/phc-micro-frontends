
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationSchedulerManualService {

  private baseUrl = environment.apiUrl;
  private path = 'notificationscheduler/';
  private token = localStorage.getItem('jwt-token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    })
  };
  constructor(private http: HttpClient, private alertifyService: AlertifyService) { }

  public manualNotification() {
    return this.http.get<any>(this.baseUrl + this.path, this.httpOptions)
    .subscribe(
      () => {},
      () => {});
  }
}
