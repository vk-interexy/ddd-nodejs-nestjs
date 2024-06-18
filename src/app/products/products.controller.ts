import { Controller, Get, HttpStatus } from "@nestjs/common";

import { ProductsService } from "./products.service";
import { ProductDto } from "./dtos/product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: ProductDto,
    isArray: true
  })
  @Get()
  public async getProducts() {
    const entities = await this.productsService.getAllProducts();
    const products = ProductDto.fromEntities(entities);
    return products || [];
  }
}
