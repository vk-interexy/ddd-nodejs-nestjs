import { Injectable } from "@nestjs/common";
import { VendorsProductsRepo } from "./repos/vendor-products.repo";

@Injectable()
export class VendorProductsService {
    constructor(
        private readonly vendorProductsRepo: VendorsProductsRepo
    ) {
    }

    public async getByVendorId(vendorId: string) {
        return this.vendorProductsRepo.getByVendorId(vendorId);
    }
}
