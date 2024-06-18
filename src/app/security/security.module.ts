import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { UserEntity } from "src/app/users/entities/user.entity";
import { UserRepo } from "src/app/users/repos/user.repo";

import { JwtStrategyService } from "src/app/security/jwt-strategy.service";
import { SecurityService } from "src/app/security/security.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt-strategy" }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>("app.jwt_secret"),
          signOptions: { expiresIn: "14d" },
        };
      },
      inject: [ConfigService],
    }),
    MikroOrmModule.forFeature({
      entities: [
        UserEntity
      ]
    })
  ],
  providers: [
    JwtStrategyService,

    SecurityService,

    UserRepo
  ],
  exports: [
    SecurityService
  ]
})
export class SecurityModule {
}
