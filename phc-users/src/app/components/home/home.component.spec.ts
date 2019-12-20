import { AlertifyService } from './../../_services/alertify.service';
import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomeComponent } from './home.component';
// tslint:disable-next-line: max-line-length
import { MatTabsModule, MatCardModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AlertifyServiceMock } from 'src/testing/mock/alertify.service.mock';
import { User } from 'src/app/_models/user';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCheckboxModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatNativeDateModule
      ],
      providers: [
        {provide: AlertifyService, useClass: AlertifyServiceMock}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

});
