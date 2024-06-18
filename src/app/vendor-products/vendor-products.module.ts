import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { VendorProductsService } from "./vendor-products.service";
import { VendorProductsController } from "./vendor-products.controller";
import { VendorProductEntity } from "./entities/vendor-product.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        VendorProductEntity
      ]
    }),
  ],
  providers: [VendorProductsService],
  controllers: [VendorProductsController]
})
export class VendorProductsModule {
}
