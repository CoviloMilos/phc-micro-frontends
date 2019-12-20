import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { UserUpdate } from '../_models/user.update';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  private baseUrl = environment.apiUrl;
  private path = 'users/';
  private _token: string;
  private httpOptions = {
    headers: new HttpHeaders()
  };
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> { 
    return this.http.get<User[]>(this.baseUrl + this.path, this.httpOptions);
  }

  setupHeaders(token: string) {
    this._token = token;
    this.httpOptions.headers = new HttpHeaders({
      'Accept': 'applications/json', 
      'Authorization': 'Bearer ' + token
    })
  }

  updateUser(userId: number, userCreate: UserUpdate) {
    return this.http.put<any>(this.baseUrl  + this.path + userId + "/", userCreate, this.httpOptions);
  }
}