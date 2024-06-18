import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserRepo } from "src/app/users/repos/user.repo";
import { UserEntity } from "src/app/users/entities/user.entity";

import { JwtTokenDto } from "src/app/security/dtos/jwt-token.dto";
import { UserSessionDto } from "src/app/security/dtos/user-session.dto";

@Injectable()
export class SecurityService {
  constructor(
    private readonly repo_user: UserRepo,
    private readonly jwtService: JwtService
  ) {
  }

  public async getUserById(userId: string) {
    return await this.repo_user.getById(userId);
  }

  // TODO replace UserEntity with security interface
  async generateToken(entity: UserEntity) {
    const payload = UserSessionDto.fromEntity(entity, []);
    const access_token = this.jwtService.sign(payload);

    return {
      access_token
    } as JwtTokenDto;
  }
}
