import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class UserToFlowerService {
  private baseUrl = environment.apiUrl;
  private path = 'users2flowers/';
  private secondPath = 'user/';
  private token = localStorage.getItem('jwt-token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) { }

  getUserToFlower(userId: any) {
    return this.http.get<any>(this.baseUrl + this.path + this.secondPath + userId + '/', this.httpOptions);
  }
}
