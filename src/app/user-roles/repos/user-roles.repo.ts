import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { UserRoleEntity } from "src/app/user-roles/entities/user-role.entity";
import { NewUserRoleForm } from "src/app/user-roles/dtos/new-user-role.form";
import { UserRoles } from "src/app/user-roles/enums/user-roles.enum";

@Injectable()
export class UserRolesRepo extends EntityRepository<UserRoleEntity> {

  async getAll() {
    return await this.findAll();
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }

  public async addOne(dto: NewUserRoleForm) {
    const role_e = this.create(dto);
    await this.persistAndFlush(role_e);
    return role_e;
  }

  public async getDefaultRole(type: UserRoles) {
    return this.findOne({ type, isDefault: true }, { orderBy: { created: "desc" } });
  }
}