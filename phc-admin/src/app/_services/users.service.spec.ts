import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UsersServiceMock, USERS_DATA } from 'src/testing/mock/users.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserUpdate } from '../_models/user.update';
import { UserCreate } from '../_models/user.create';

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
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it('should return array of users', () => {
    spyOn(service, 'getUsers').and.returnValue(of(USERS_DATA));
    let response;
    service.getUsers().subscribe(users => {
      response = users;
    })
    expect(response).toEqual(USERS_DATA);
  });

  it('should return a single user', () => {
    let response;
    service.getUserById(1).subscribe(user => {
      response = user;
    })
    expect(response).toEqual(USERS_DATA[0]);
  });

  it('should return Observable of any for create user', () => {
    let mockUser: UserCreate = 
    {
      admin: USERS_DATA[0].admin,
      first_name: USERS_DATA[0].first_name,
      last_name: USERS_DATA[0].last_name,
      email: USERS_DATA[0].email,
      username: USERS_DATA[0].username,
      password: 'password'
    };

    service.createUser(mockUser)
      .subscribe((res) => {
        expect(res).toEqual({msg: 'New user added to DB.'});
    })
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

  it('should return Observable of any for delete user', () => {
    service.deleteUser(1)
      .subscribe(res => {
        expect(res).toEqual({msg: 'User with user_id 1 is deleted from DB.'});
    });
  });
  
});
