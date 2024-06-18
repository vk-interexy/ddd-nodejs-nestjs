import { Controller, Get, Param } from "@nestjs/common";
import { VendorProductDto } from "./dtos/vendor-product.dto";

import { VendorProductsService } from "./vendor-products.service";

@Controller("vendor-products")
export class VendorProductsController {
    constructor(private readonly vendorProductsService: VendorProductsService) {
    }

    @Get(":vendor_id")
    public async getByVendor(@Param("vendor_id") vendorId: string) {
        const entities = await this.vendorProductsService.getByVendorId(vendorId);
        const products = VendorProductDto.fromEntities(entities);
        return products || [];
    }
}
