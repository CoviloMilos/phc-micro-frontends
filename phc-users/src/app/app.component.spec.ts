import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
// tslint:disable-next-line: max-line-length
import { MatCardModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatDatepickerModule, MatRadioModule, MatNativeDateModule } from '@angular/material';
import { RegisterPlantComponent } from './components/home/register-plant/register-plant.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatGridListModule,
        MatSelectModule,
        MatGridListModule,
        MatDatepickerModule,
        MatRadioModule,
        MatNativeDateModule
      ],
      declarations: [
        AppComponent,
        ProfileComponent,
        RegisterPlantComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
