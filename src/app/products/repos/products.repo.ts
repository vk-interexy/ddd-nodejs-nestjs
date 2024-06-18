import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { ProductEntity } from "src/app/products/entities/product.entity";

@Injectable()
export class ProductsRepo extends EntityRepository<ProductEntity> {
  public async getAll() {
    return this.findAll({ populate: ["vendorProducts"] });
  }
}