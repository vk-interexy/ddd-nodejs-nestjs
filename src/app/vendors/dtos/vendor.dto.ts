import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";

import { UUIDDto } from "src/shared/dtos/uuid.dto";

import { VendorProductDto } from "src/app/vendor-products/dtos/vendor-product.dto";
import { VendorEntity } from "src/app/vendors/entities/vendor.entity";

export class VendorDto extends UUIDDto {
  @ApiProperty({
    description: "vendor name"
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: "vendor description"
  })
  @IsString()
  description!: string;

  @ApiProperty({
    description: "vendor image url"
  })
  @IsString()
  imageUrl!: string;

  @ApiProperty({
    description: "vendor product objects",
    required: false,
    isArray: true,
    type: () => VendorProductDto
  })
  @ValidateNested({ context: VendorProductDto })
  products?: VendorProductDto[];

  public static fromEntity(entity?: VendorEntity) {
    if (!entity) {
      return;
    }

    const it = new VendorDto();
    it.id = entity.id;
    it.name = entity.name;
    it.description = entity.description;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();

    it.products = VendorProductDto.fromEntities(entity.products);
    return it;
  }

  public static fromEntities(entities?: VendorEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map(entity => this.fromEntity(entity));
  }
}