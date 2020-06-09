import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressesService {
  getAll(): any {
    return [{ address: "New York" }, { address: "Chicago" }];
  }
  getSingular(id): any {
    return { id };
  }
}
