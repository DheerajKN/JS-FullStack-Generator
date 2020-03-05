import { Controller, Get, Param } from "@nestjs/common";
import { AddressesService } from "./addresses.service";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}
  @Get()
  fetchAll(): any {
    return this.addressService.fetchAll();
  }
  @Get(":id")
  fetchSingular(@Param("id") id: Number): any {
    return this.addressService.singluarFetch(id);
  }
}
