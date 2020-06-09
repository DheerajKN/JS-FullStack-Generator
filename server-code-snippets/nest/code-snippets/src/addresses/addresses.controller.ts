import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AddressesService } from "./addresses.service";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}
  @Get(':id')
  getSingular(@Param() id: string): any {
    return this.addressService.getSingular(id);
  }

  @Get()
  getAll(): any {
    return this.addressService.getAll();
  }
}
