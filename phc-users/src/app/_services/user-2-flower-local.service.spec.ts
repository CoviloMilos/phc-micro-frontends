import { TestBed } from '@angular/core/testing';

import { User2FlowerLocalService } from './user-2-flower-local.service';

describe('User2FlowerLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User2FlowerLocalService = TestBed.get(User2FlowerLocalService);
    expect(service).toBeTruthy();
  });
});
