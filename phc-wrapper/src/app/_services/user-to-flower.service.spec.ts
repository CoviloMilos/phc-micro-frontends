import { TestBed } from '@angular/core/testing';

import { UserToFlowerService } from './user-to-flower.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserToFlowerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [

    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: UserToFlowerService = TestBed.get(UserToFlowerService);
    expect(service).toBeTruthy();
  });
});
