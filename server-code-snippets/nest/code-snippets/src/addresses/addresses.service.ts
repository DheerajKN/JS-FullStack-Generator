import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressesService {
  fetchAll(): any {
    return [{ address: "New York" }, { address: "Chicago" }];
  }
  singluarFetch(id): any {
    return { id };
  }
}
