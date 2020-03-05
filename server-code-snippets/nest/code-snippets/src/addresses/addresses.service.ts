import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressesService {
  fetchAll(): any {
    return [{ user: 'New York' }, { user: 'Chicago' }];
  }
  singluarFetch(id): any {
    return { id };
  }
}
