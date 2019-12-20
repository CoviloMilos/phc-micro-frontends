import { TestBed } from '@angular/core/testing';
import { UsertoflowerService } from './usertoflower.service';
import { UserToFlowerServiceMock, USER_TO_FLOWER_DATA } from 'src/testing/mock/user.to.flower.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserToFlower } from '../_models/usertoflower';
import { UserToFlowerUpdate } from '../_models/userToFlowerUpdate';

describe('UsertoflowerService', () => {
  let service: UserToFlowerServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: UsertoflowerService, useClass: UserToFlowerServiceMock}
      ]
    });
    service = TestBed.get(UsertoflowerService);
  });

  it('should be created', () => {
    const service: UsertoflowerService = TestBed.get(UsertoflowerService);
    expect(service).toBeTruthy();
  });

  it('should have getUserToFlower() function', () => {
    expect(service.getUserToFlower(1)).toBeTruthy();
  });

  it('should have createUserToFlower() function', () => {
    expect(service.createUserToFlower(null)).toBeTruthy();
  });

  it('should have updateUserToFlower() function', () => {
    expect(service.updateUserToFlower(null, '1')).toBeTruthy();
  });

  it('should return userToFlower object', () => {
    service.getUserToFlower(1)
      .subscribe(res => {
        expect(res).toEqual(USER_TO_FLOWER_DATA[0]);
    });
  });

  it('should return userToFlower object', () => {
    service.getUserToFlower(1)
      .subscribe(res => {
        expect(res).toEqual(USER_TO_FLOWER_DATA[0]);
    });
  });

  it('should return Observable of any for userToflower create', () => {
    let userToFlowerMock: UserToFlower = 
    {
      user_id: USER_TO_FLOWER_DATA[0].user_id,
      flower_id: USER_TO_FLOWER_DATA[0].flower_id,
      date_of_inception: USER_TO_FLOWER_DATA[0].date_of_inception,
      email: USER_TO_FLOWER_DATA[0].email
    };

    service.createUserToFlower(userToFlowerMock)
      .subscribe((res) => {
        expect(res).toEqual({msg: 'New user 2 flower added to DB.'});
    })
  });

  it('should return any for userToflower update', () => {
    let userToFlowerUpdateMock: UserToFlowerUpdate = 
    {
      flower_id: USER_TO_FLOWER_DATA[0].flower_id,
      date_of_inception: USER_TO_FLOWER_DATA[0].date_of_inception,
      email: USER_TO_FLOWER_DATA[0].email
    };

    service.updateUserToFlower(userToFlowerUpdateMock, USER_TO_FLOWER_DATA[0].user_id)
      .subscribe((res) => {
        expect(res).toEqual({msg: 'User 2 flower updated.'});
    })
  });
});
