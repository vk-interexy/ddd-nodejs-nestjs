import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { VendorEntity } from "src/app/vendors/entities/vendor.entity";

@Injectable()
export class VendorsRepo extends EntityRepository<VendorEntity> {
  public async getAll() {
    return this.findAll();
  }
}