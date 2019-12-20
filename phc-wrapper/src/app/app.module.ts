import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { FlowersManagementComponent } from './components/flowers-management/flowers-management.component';
import { AboutComponent } from './components/about/about.component';
import { ConfirmDialogComponent } from './_shared/confirm-dialog/confirm-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { ImagePreviewComponent } from './components/about/image-preview/image-preview.component';

// Services
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { NotificationSchedulerManualService } from './_services/notification-scheduler-manual.service';
import { UserToFlowerService } from './_services/user-to-flower.service';
import { FlowersService } from './_services/flowers.service';

// Angular Material
import { AngularMaterialModule } from './angular-material.module';
import { MatCardModule, MatMenuModule, MatTabsModule, MatGridListModule, MatCheckboxModule, MatMenu } from '@angular/material';

// Routes
import { appRoutes } from './routes';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    UsersManagementComponent,
    FlowersManagementComponent,
    AboutComponent,
    ConfirmDialogComponent,
    RegisterDialogComponent,
    ProfileComponent,
    ImagePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    AuthService,
    AlertifyService,
    NotificationSchedulerManualService,
    UserToFlowerService,
    FlowersService
  ],
  entryComponents: [
    ConfirmDialogComponent,
    RegisterDialogComponent,
    ImagePreviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
