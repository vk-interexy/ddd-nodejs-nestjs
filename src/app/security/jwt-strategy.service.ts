import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as passport from "passport";

import { UserStatuses } from "src/app/users/enums/user-statuses.enum";
import { SecurityService } from "src/app/security/security.service";
import { UserSessionDto } from "src/app/security/dtos/user-session.dto";
import { ErrorCodes } from "src/shared/enums/error-codes.enum";

@Injectable()
export class JwtStrategyService extends Strategy {
  readonly name = "jwt-strategy";

  constructor(
    private readonly configService: ConfigService,
    private readonly securityService: SecurityService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: configService.get("app.jwt_secret")
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload: UserSessionDto, done) {
    const user = await this.securityService.getUserById(payload.id);

    if (!user) {
      return done(ErrorCodes.NotExists_User, false);
    }

    if (user.status !== UserStatuses.Active) {
      return done("errors.invalid-status.user-not-active", false);
    }

    done(null, payload);
  }
}
