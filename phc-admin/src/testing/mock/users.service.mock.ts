import { User } from 'src/app/_models/user';
import { Observable, of } from 'rxjs';
import { UserCreate } from 'src/app/_models/user.create';
import { UserUpdate } from 'src/app/_models/user.update';

export const USERS_DATA: User[] = [
    {
      admin: 'True',
      email: 'afs.covilo@devoteam.com',
      first_name: 'asdas',
      last_name: 'Coviasdasdlo',
      user_id: 28,
      username: 'fasdf'
    },
    {
      admin: 'False',
      email: 'afs.covilo@devoteam.com',
      first_name: '',
      last_name: 'Gatewaylastname',
      user_id: 29,
      username: 'getttt'
    },
    {
      admin: 'False',
      email: 'user@email.com',
      first_name: 'user',
      last_name: 'user',
      user_id: 43,
      username: 'username'
    },
    {
      admin: 'False',
      email: 'marko.kraljevic@devoteam.com',
      first_name: 'Marko',
      last_name: 'Kraljevic',
      user_id: 44,
      username: 'mkraljevic'
    }
  ];

export class UsersServiceMock {

  public getUsers(): Observable<User[]> {
    return of(USERS_DATA);
  }

  getUserById(userId: any): Observable<User> {
      return of(USERS_DATA[0]);
  }

  createUser(user: UserCreate): Observable<any> {
      return of({msg: 'New user added to DB.'});
  }

  updateUser(userId: number, userCreate: UserUpdate): Observable<any> {
    return of({msg: 'User with user_id 1 is updated.'});
  }

  deleteUser(userId: number): Observable<any> {
    return of({msg: 'User with user_id 1 is deleted from DB.'});
  }
}
