import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { UserRolesService } from "./user-roles.service";
import { UserRolesController } from "./user-roles.controller";
import { UserRoleEntity } from "./entities/user-role.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        UserRoleEntity
      ]
    }),
  ],
  providers: [UserRolesService],
  controllers: [UserRolesController]
})
export class UserRolesModule {
}
