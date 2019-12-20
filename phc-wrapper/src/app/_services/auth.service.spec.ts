import { AlertifyServiceMock } from './../../testing/mock/alertify.service.mock';
import { AlertifyService } from './alertify.service';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
      ],
      providers: [
        { provide: AlertifyService, useClass: AlertifyServiceMock }
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
