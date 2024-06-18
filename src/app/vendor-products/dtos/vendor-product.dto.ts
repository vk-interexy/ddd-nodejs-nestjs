import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID, ValidateNested } from "class-validator";

import { NoIDDto } from "src/shared/dtos/noid.dto";

import { VendorDto } from "src/app/vendors/dtos/vendor.dto";
import { ProductDto } from "src/app/products/dtos/product.dto";
import { VendorProductEntity } from "src/app/vendor-products/entities/vendor-product.entity";

export class VendorProductDto extends NoIDDto {
  @ApiProperty({
    description: "vendor id"
  })
  @IsUUID()
  vendorId!: string;

  @ApiProperty({
    description: "product id"
  })
  @IsUUID()
  productId!: string;

  @ApiProperty({
    description: "product price"
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    description: "vendor object",
    required: false,
    type: () => VendorDto
  })
  @ValidateNested({ context: VendorDto })
  vendor?: VendorDto;

  @ApiProperty({
    description: "product object",
    required: false,
    type: () => ProductDto
  })
  @ValidateNested({ context: ProductDto })
  product?: ProductDto;

  public static fromEntity(entity?: VendorProductEntity) {
    if (!entity) {
      return;
    }

    const it = new VendorProductDto();
    it.productId = entity.productId;
    it.vendorId = entity.vendorId;
    it.price = entity.price;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();

    it.vendor = VendorDto.fromEntity(entity.vendor);
    it.product = ProductDto.fromEntity(entity.product);
    return it;
  }

  public static fromEntities(entities?: VendorProductEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map(entity => this.fromEntity(entity));
  }
}