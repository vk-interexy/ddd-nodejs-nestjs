import { Entity, Property, Enum, OneToMany } from "@mikro-orm/core";
import { minBy } from "lodash";

import { UUIDEntity } from "src/shared/entities/uuid.entity";

import { ProductsRepo } from "src/app/products/repos/products.repo";
import { ProductTypes } from "src/app/products/enums/product-types.enum";
import { VendorProductEntity } from "src/app/vendor-products/entities/vendor-product.entity";

@Entity({ tableName: "products", customRepository: () => ProductsRepo })
export class ProductEntity extends UUIDEntity {
  @Enum({ name: "type", array: false, items: () => ProductTypes })
  type!: ProductTypes;

  @Property({ name: "name" })
  name!: string;

  @Property({ name: "type", type: "text" })
  description!: string;

  @Property({ name: "image_url" })
  imageUrl!: string;

  @Property({ name: "price" })
  get price(): number {
    if (!this.vendorProducts) {
      return 0;
    }

    const min = minBy(this.vendorProducts, product => product.price);
    return min.price;
  }

  @OneToMany(() => VendorProductEntity, vendor => vendor.product, { joinColumn: "id", inverseJoinColumn: "product_id", lazy: true })
  vendorProducts?: VendorProductEntity[];
}