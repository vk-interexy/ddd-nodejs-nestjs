import { BadRequestException, Injectable } from "@nestjs/common";

import { UserRepo } from "src/app/users/repos/user.repo";
import { SecurityService } from "src/app/security/security.service";
import { UserSignInForm } from "src/app/auth/dtos/user-sign-in.form";
import { ErrorCodes } from "src/shared/enums/error-codes.enum";
import { UserSignUpForm } from "./dtos/user-sign-up.form";
import { UserRolesRepo } from "../user-roles/repos/user-roles.repo";
import { UserRoleDto } from "../user-roles/dtos/user-role.dto";
import { UserRoles } from "../user-roles/enums/user-roles.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly repo_users: UserRepo,
    private readonly repo_user_roles: UserRolesRepo,
    private readonly securityService: SecurityService
  ) {
  }

  async validateUserById(id: string) {
    return await this.repo_users.getById(id);
  }

  async signIn(form: UserSignInForm) {
    const entity = await this.repo_users.getByEmailAndPassword(form.email, form.password);
    if (!entity) {
      throw new BadRequestException({ message: ErrorCodes.NotExists_User });
    }

    return await this.securityService.generateToken(entity);
  }

  async signUp(form: UserSignUpForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.Client);
    const dto_role = UserRoleDto.fromEntity(e_role);
    const entity = await this.repo_users.addOneClient(form, dto_role);
    return await this.securityService.generateToken(entity);
  }
}
