import { Entity, Property, PrimaryKey, ManyToOne, EntityRepositoryType } from "@mikro-orm/core";

import { NoIdEntity } from "src/shared/entities/no-id.entity";

import { VendorsProductsRepo } from "src/app/vendor-products/repos/vendor-products.repo";
import { ProductEntity } from "src/app/products/entities/product.entity";
import { VendorEntity } from "src/app/vendors/entities/vendor.entity";

@Entity({ tableName: "vendor_products", customRepository: () => VendorsProductsRepo })
export class VendorProductEntity extends NoIdEntity {
  [EntityRepositoryType]?: VendorsProductsRepo;

  @PrimaryKey({ name: "vendor_id", type: "uuid" })
  vendorId!: string;

  @PrimaryKey({ name: "product_id", type: "uuid" })
  productId!: string;

  @Property({ name: "price" })
  price!: number;

  @ManyToOne(() => VendorEntity, { joinColumn: "vendor_id", lazy: true })
  vendor?: VendorEntity;

  @ManyToOne(() => ProductEntity, { joinColumn: "product_id", lazy: true })
  product?: ProductEntity;
}