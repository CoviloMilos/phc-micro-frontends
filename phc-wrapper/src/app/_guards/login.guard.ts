import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {

    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
      return;
    }
    return true;
  }
}
