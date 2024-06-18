import { Injectable } from "@nestjs/common";

// ---------- Repositories ------------------
import { UserRepo } from "./repos/user.repo";
import { UserDetailRepo } from "./repos/user-detail.repo";
import { NewUserForm } from "./dtos/new-user.form";
import { UserRolesRepo } from "../user-roles/repos/user-roles.repo";
import { UserRoles } from "../user-roles/enums/user-roles.enum";
import { UserRoleDto } from "../user-roles/dtos/user-role.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly repo_users: UserRepo,
    private readonly repo_user_info: UserDetailRepo,
    private readonly repo_user_roles: UserRolesRepo
  ) {
  }

  async getUsers() {
    return await this.repo_users.getList();
  }

  async getUserByEmail(email: string) {
    return await this.repo_users.getByEmail(email);
  }

  async getUserInfo(userId: string) {
    return await this.repo_user_info.getById(userId);
  }

  async addNewUser(dto: NewUserForm) {
    const e_role = await this.repo_user_roles.getDefaultRole(UserRoles.Client);
    const dto_role = await UserRoleDto.fromEntity(e_role);
    return await this.repo_users.addOneClient(dto, dto_role);
  }

}
