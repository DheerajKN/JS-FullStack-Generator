import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AddressesModule } from "./addresses/addresses.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../..", "build")
    }),
    AddressesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
