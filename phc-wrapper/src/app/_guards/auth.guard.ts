import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {

    if (this.authService.loggedIn()) {
      const roles = next.data.roles as Array<string>;
      if (roles) {
          const match = this.authService.rolesMatch(roles);
          if (match) {
              return true;
          } else {
             this.router.navigate(['/home']);
             return;
          }
      }
      return true;
    }

    this.alertify.error('YOU SHALL NOT PASS!');
    this.router.navigate(['/login']);
    return false;
  }
}
