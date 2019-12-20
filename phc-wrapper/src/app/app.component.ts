import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phc-wrapper';

  constructor(private authService: AuthService) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.authService.currentUser = user;
    }
  }
}
