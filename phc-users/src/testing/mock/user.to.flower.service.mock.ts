import { of, Observable } from 'rxjs';
import { UserToFlower } from 'src/app/_models/usertoflower';
import { UserToFlowerUpdate } from 'src/app/_models/userToFlowerUpdate';

export const USER_TO_FLOWER_DATA: any[] = 
  [
    {
      "date_of_inception": "2019-11-14",
      "email": false,
      "flower_id": "21",
      "user2flower_id": "66",
      "user_id": "113"
    },
    {
      "date_of_inception": "2019-10-31",
      "email": false,
      "flower_id": "19",
      "user2flower_id": "67",
      "user_id": "114"
    },
    {
      "date_of_inception": "2019-12-14",
      "email": false,
      "flower_id": "20",
      "user2flower_id": "68",
      "user_id": "64"
    },
    {
      "date_of_inception": "2019-11-21",
      "email": true,
      "flower_id": "23",
      "user2flower_id": "75",
      "user_id": "119"
    },
    {
      "date_of_inception": "2019-10-30",
      "email": true,
      "flower_id": "21",
      "user2flower_id": "76",
      "user_id": "117"
    },
    {
      "date_of_inception": "2019-11-01",
      "email": false,
      "flower_id": "22",
      "user2flower_id": "69",
      "user_id": "118"
    },
    {
      "date_of_inception": "2019-10-29",
      "email": false,
      "flower_id": "20",
      "user2flower_id": "65",
      "user_id": "107"
    },
    {
      "date_of_inception": "2019-09-16",
      "email": false,
      "flower_id": "18",
      "user2flower_id": "80",
      "user_id": "59"
    },
    {
      "date_of_inception": "2019-12-14",
      "email": true,
      "flower_id": "23",
      "user2flower_id": "81",
      "user_id": "121"
    },
    {
      "date_of_inception": "2019-11-14",
      "email": true,
      "flower_id": "21",
      "user2flower_id": "82",
      "user_id": "122"
    }
  ]

export class UserToFlowerServiceMock {

    getUserToFlower(user_id: any): Observable<any[]> { 
        return of(USER_TO_FLOWER_DATA[0]);
    }

    createUserToFlower(userToFlower: UserToFlower): Observable<any> {
        return of({msg: 'New user 2 flower added to DB.'});
    }
    
    updateUserToFlower(user2Flower: UserToFlowerUpdate , user2flowerid: string) {
        return of({msg: 'User 2 flower updated.'});
    }
}