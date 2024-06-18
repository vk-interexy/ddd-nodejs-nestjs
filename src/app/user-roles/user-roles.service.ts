import { Injectable } from "@nestjs/common";

import { NewUserRoleForm } from "./dtos/new-user-role.form";
import { UserRolesRepo } from "./repos/user-roles.repo";

@Injectable()
export class UserRolesService {
    public constructor(private readonly repo_user_roles: UserRolesRepo) { }

    public async addRole(dto: NewUserRoleForm) {
        return this.repo_user_roles.addOne(dto);
    }

    public async getAllRoles() {
        return this.repo_user_roles.getAll();
    }
}
