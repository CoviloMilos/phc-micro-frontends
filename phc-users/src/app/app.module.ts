import { User2FlowerLocalService } from './_services/user-2-flower-local.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';

// Angular Material
import { AngularMaterialModule } from './angular-material.module';
import { MatCheckboxModule, MatGridListModule, MatCardModule, MatTabsModule, MatMenuModule } from '@angular/material';

// ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap';

// Services
import { AlertifyService } from './_services/alertify.service';
import { FlowerService } from './_services/flower.service';
import { UsertoflowerService } from './_services/usertoflower.service';
import { UsersService } from './_services/users.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlantPreviewComponent } from './components/home/plant-preview/plant-preview.component';
import { ConfirmationdialogComponent } from './_shared/confirmationdialog/confirmationdialog.component';
import { RegisterPlantComponent } from './components/home/register-plant/register-plant.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlantPreviewComponent,
    ConfirmationdialogComponent,
    RegisterPlantComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  providers: [
    UsertoflowerService,
    FlowerService,
    AlertifyService,
    UsersService,
    User2FlowerLocalService
  ],
  /*entryComponents: [
    ConfirmationdialogComponent,
    PlantPreviewComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }*/
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AppComponent,
    PlantPreviewComponent,
    HomeComponent,
    RegisterPlantComponent,
    ProfileComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const { injector } = this;
    customElements.define('phc-users-comp-flowers', createCustomElement(HomeComponent, { injector }));
    customElements.define('phc-users-comp-profile', createCustomElement(ProfileComponent, { injector }));
  }
}
