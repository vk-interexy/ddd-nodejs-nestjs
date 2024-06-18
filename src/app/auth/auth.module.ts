import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { SecurityModule } from "src/app/security/security.module";
import { UserEntity } from "src/app/users/entities/user.entity";

import { AuthController } from "src/app/auth/auth.controller";
import { AuthService } from "src/app/auth/auth.service";
import { UserRoleEntity } from "../user-roles/entities/user-role.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        UserEntity,
        UserRoleEntity
      ]
    }),
    SecurityModule
  ],
  providers: [
    AuthService
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
