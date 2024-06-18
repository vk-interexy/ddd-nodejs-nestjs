import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { UserDetailEntity } from "src/app/users/entities/user-detail.entity";

@Injectable()
export class UserDetailRepo extends EntityRepository<UserDetailEntity> {

  async getById(id: string) {
    return await this.findOne({ id });
  }

}