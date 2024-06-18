import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { v4 } from "uuid";

import { UserEntity } from "src/app/users/entities/user.entity";
import { UserStatuses } from "src/app/users/enums/user-statuses.enum";
import { UserRoleDto } from "src/app/user-roles/dtos/user-role.dto";
import { UserSignUpForm } from "src/app/auth/dtos/user-sign-up.form";

@Injectable()
export class UserRepo extends EntityRepository<UserEntity> {

  async getList() {
    return await this.findAll();
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.findOne({ email });
  }

  async getByEmailAndPassword(email: string, password: string) {
    return await this.findOne({ email, password });
  }

  async addOneClient(dto: UserSignUpForm, dto_role: UserRoleDto) {
    const newUser = this.create({
      roleId: dto_role.id,
      roleType: dto_role.type,
      status: UserStatuses.Active,

      email: dto.email,
      password: dto.password,
    });
    await this.persistAndFlush(newUser);
    return newUser;
  }
}