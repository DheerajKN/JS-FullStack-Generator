import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  fetchAll(): any {
    return this.userService.fetchAll();
  }
  @Get(":id")
  fetchSingular(@Param("id") id: Number): any {
    return this.userService.singluarFetch(id);
  }
}
