import { Test, TestingModule } from "@nestjs/testing";
import { VendorProductsController } from "./vendor-products.controller";

describe("VendorProductsController", () => {
  let controller: VendorProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorProductsController]
    }).compile();

    controller = module.get<VendorProductsController>(VendorProductsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
