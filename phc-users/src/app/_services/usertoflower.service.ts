import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { UserToFlower } from '../_models/usertoflower';
import { UserToFlowerUpdate } from '../_models/userToFlowerUpdate';
import { environment } from 'src/environments/environment';
import { UserToFlowerInfo } from '../_models/userToFlowerInfo';
import { map } from 'rxjs/operators';
import { FlowerGlobal } from '../_models/flower.global';

@Injectable({
  providedIn: 'root'
})
export class UsertoflowerService {
  private baseUrl = environment.apiUrl;
  private path = 'users2flowers/';
  private secondPath = 'user/';
  private _token: string;
  private httpOptions = {
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient,
    private alertifyService: AlertifyService) { }

  
  setupHeaders(token: string) {
    this._token = token;
    this.httpOptions.headers = new HttpHeaders({
      'Accept': 'applications/json', 
      'Authorization': 'Bearer ' + token
    })
  }

  createUserToFlower(userToFlower: UserToFlower) {
    return this.http.post<UserToFlower>(this.baseUrl + this.path, userToFlower, this.httpOptions)
    .subscribe(() => {
      this.alertifyService.success('Thank you for trusting us!');
    }, () => {
      this.alertifyService.error('Something went wrong. Please try later again.');
    });
  }

  getUserToFlower(userId: any) {
    return this.http.get<any>(this.baseUrl + this.path + this.secondPath + userId + '/', this.httpOptions);
  }

  updateUserToFlower(user2Flower: UserToFlowerUpdate , user2flowerid: string) {
    return this.http.put<UserToFlowerUpdate>(this.baseUrl + this.path + user2flowerid + '/', user2Flower,this.httpOptions)
    .subscribe(() => {
      this.alertifyService.success('Plant updated successfully');
    }, () => {
      this.alertifyService.error('Could not update plant');
    });
  }
}
