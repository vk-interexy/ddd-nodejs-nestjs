import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";

import { VendorProductEntity } from "src/app/vendor-products/entities/vendor-product.entity";

@Injectable()
export class VendorsProductsRepo extends EntityRepository<VendorProductEntity> {

    public async getByVendorId(vendorId: string) {
        return this.find({ vendorId }, { populate: ["product"] });
    }
}