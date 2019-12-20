import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NotificationSchedulerManualService } from './notification-scheduler-manual.service';

describe('NotificationSchedulerManualService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [

    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: NotificationSchedulerManualService = TestBed.get(NotificationSchedulerManualService);
    expect(service).toBeTruthy();
  });
});
