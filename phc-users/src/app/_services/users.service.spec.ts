import { UsersServiceMock, USERS_DATA } from './../../testing/mock/users.service.mock';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserUpdate } from '../_models/user.update';

describe('UsersService', () => {
  let service: UsersServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: UsersService, useClass: UsersServiceMock}
      ]
    });
    service = TestBed.get(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Observable of any for update user', () => {
    let mockUser: UserUpdate = {
      admin: USERS_DATA[0].admin,
      first_name: 'Unit Test Update',
      last_name: 'Unit Test Update'
    };

    service.updateUser(1, mockUser)
      .subscribe(res => {
        expect(res).toEqual({msg: 'User with user_id 1 is updated.'});
      });
  });
  
});
