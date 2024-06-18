import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { SecurityModule } from "src/app/security/security.module";

import { UserDetailEntity } from "src/app/users/entities/user-detail.entity";
import { UserEntity } from "src/app/users/entities/user.entity";

import { UsersController } from "src/app/users/users.controller";
import { UsersService } from "src/app/users/users.service";
import { UserRoleEntity } from "src/app/user-roles/entities/user-role.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        UserEntity,
        UserDetailEntity,
        UserRoleEntity
      ]
    }),
    SecurityModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService
  ]
})
export class UsersModule {
}
