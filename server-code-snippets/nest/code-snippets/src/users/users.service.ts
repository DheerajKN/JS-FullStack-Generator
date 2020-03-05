import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  singluarFetch(id: Number): any {
    return { id };
  }
  fetchAll(): any {
    return [{ user: 'New York' }, { user: 'Chicago' }];
  }
}
