import { IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { UUIDDto } from "src/shared/dtos/uuid.dto";

import { VendorProductDto } from "src/app/vendor-products/dtos/vendor-product.dto";
import { ProductTypes } from "src/app/products/enums/product-types.enum";
import { ProductEntity } from "../entities/product.entity";

export class ProductDto extends UUIDDto {
  @ApiProperty({
    description: "product type"
  })
  @IsEnum(ProductTypes)
  type!: ProductTypes;

  @ApiProperty({
    description: "product name"
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: "product description"
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: "product image url"
  })
  @IsString()
  imageUrl!: string;

  @ApiProperty({
    description: "product min price"
  })
  @IsNumber()
  price!: number;

  @ApiProperty({
    description: "vendor product objects",
    required: false,
    isArray: true,
    type: () => VendorProductDto
  })
  @ValidateNested({ context: VendorProductDto })
  vendorProducts?: VendorProductDto[];

  public static fromEntity(entity?: ProductEntity) {
    if (!entity) {
      return;
    }

    const it = new ProductDto();
    it.id = entity.id;
    it.type = entity.type;
    it.name = entity.name;
    it.description = entity.description;
    it.imageUrl = entity.imageUrl;
    it.price = entity.price;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();

    it.vendorProducts = VendorProductDto.fromEntities(entity.vendorProducts);
    return it;
  }

  public static fromEntities(entities?: ProductEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map(entity => this.fromEntity(entity));
  }
}