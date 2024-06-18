import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductEntity } from "./entities/product.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        ProductEntity
      ]
    }),
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {
}
