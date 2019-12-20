import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { UserCreate } from '../_models/user.create';
import { Observable } from 'rxjs';
import { Login } from '../_models/login';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = {
    user_id: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    admin: ''
  };
  private decodedToken: any;
  private baseUrl = environment.apiUrl;
  private path = 'usermanagement/login/';
  private jwtHelper = new JwtHelperService();
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'applications/json'
    })
  };

  constructor(private http: HttpClient,
              private router: Router,
              private alertifyService: AlertifyService) { }

  login(model: Login) {
    return this.http.post(this.baseUrl + this.path, model)
      .pipe(
        map((response: any) => {
          localStorage.setItem('jwt-token', response.token);
          this.decodedToken = this.jwtHelper.decodeToken(response.token);

          this.currentUser.email = this.decodedToken.email;
          this.currentUser.username = this.decodedToken.username;
          this.currentUser.first_name = this.decodedToken.first_name;
          this.currentUser.last_name = this.decodedToken.last_name;
          this.currentUser.admin = this.decodedToken.admin;
          this.currentUser.user_id = this.decodedToken.user_id;

          localStorage.setItem('user', JSON.stringify(this.currentUser));
        })
      )
      .subscribe(
        () => {
          this.alertifyService.success('Welcome ' +  model.username + '!');
      }, (error) => {
        // tslint:disable-next-line: triple-equals
        if (error.status == 401) {
          this.alertifyService.error('Wrong username or password!');
        } else {
          this.alertifyService.error('Failed to login. Please try again later.');
        }
      }, () => {
        this.router.navigate(['/home']);
      });
  }

  registerUser(user: UserCreate): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'usermanagement/register/', user, this.httpOptions);
  }

  loggedIn() {
    const token = localStorage.getItem('jwt-token');
    if (token == null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.alertifyService.message('Logged out!');
  }

  rolesMatch(allowedRoles): boolean {
    const user: User = JSON.parse(localStorage.getItem('user'));
    // tslint:disable-next-line: triple-equals
    const isAdmin = (user.admin == 'True');
    if (isAdmin) {
      return true;
    }

    return false;
  }
}
