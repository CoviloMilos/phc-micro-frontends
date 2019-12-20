import { UsersService } from './_services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule, MatSortModule, MatTableModule, MatCardModule } from '@angular/material';

// Services
import { FlowersService } from './_services/flowers.service';
import { AlertifyService } from './_services/alertify.service';

// Components
import { UsersComponent } from './components/users/users.component';
import { AppComponent } from './app.component';
import { CreateUserDialogComponent } from './components/users/create-user-dialog/create-user-dialog.component';
import { UpdateUserDialogComponent } from './components/users/update-user-dialog/update-user-dialog.component';
import { ConfirmDialogComponent } from './_shared/confirm-dialog/confirm-dialog.component';
import { FlowersComponent } from './components/flowers/flowers.component';
import { CreateFlowerDialogComponent } from './components/flowers/create-flower-dialog/create-flower-dialog.component';
import { UpdateFlowerDialogComponent } from './components/flowers/update-flower-dialog/update-flower-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUserDialogComponent,
    UpdateUserDialogComponent,
    ConfirmDialogComponent,
    FlowersComponent,
    CreateFlowerDialogComponent,
    UpdateFlowerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [
    UsersService,
    AlertifyService,
    FlowersService,
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AppComponent,
    UsersComponent,
    CreateUserDialogComponent,
    UpdateUserDialogComponent,
    ConfirmDialogComponent,
    FlowersComponent,
    CreateFlowerDialogComponent,
    UpdateFlowerDialogComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const { injector } = this;
    customElements.define('phc-admin-comp-users', createCustomElement(UsersComponent, { injector }));
    customElements.define('phc-admin-comp-flowers', createCustomElement(FlowersComponent, { injector }));
  }
}
