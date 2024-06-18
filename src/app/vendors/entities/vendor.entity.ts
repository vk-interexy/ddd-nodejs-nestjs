import { Entity, Property, OneToMany } from "@mikro-orm/core";

import { UUIDEntity } from "src/shared/entities/uuid.entity";

import { VendorsRepo } from "src/app/vendors/repos/vendors.repo";
import { VendorProductEntity } from "src/app/vendor-products/entities/vendor-product.entity";

@Entity({ tableName: "vendors", customRepository: () => VendorsRepo })
export class VendorEntity extends UUIDEntity {
  @Property({ name: "name" })
  name!: string;

  @Property({ name: "type", type: "text" })
  description!: string;

  @Property({ name: "image_url" })
  imageUrl!: string;

  @OneToMany(() => VendorProductEntity, product => product.vendor, { joinColumn: "id", inverseJoinColumn: "vendor_id", lazy: true })
  products?: VendorProductEntity[];
}