import { HeadersSetup } from './../_shared/headers.setup';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { UserCreate } from '../_models/user.create';
import { UserUpdate } from '../_models/user.update';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements HeadersSetup{

  private baseUrl = environment.apiUrl;
  private path = 'users/'
  private httpOptions = {
    headers: new HttpHeaders()
  };
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> { 
    return this.http.get<User[]>(this.baseUrl + this.path, this.httpOptions);
  }

  setupHeaders(token: string) {
    this.httpOptions.headers = new HttpHeaders({
      'Accept': 'applications/json',
      'Authorization': 'Bearer ' + token
    })
  }

  getUserById(userId: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + this.path + "/1", this.httpOptions);
  }

  createUser(user: UserCreate): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.path, user, this.httpOptions);
  }

  updateUser(userId: number, userCreate: UserUpdate) {
    return this.http.put<any>(this.baseUrl  + this.path + userId + "/", userCreate, this.httpOptions);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.baseUrl + this.path + userId + "/", this.httpOptions);
  }
}
