import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { I18nModule } from "nestjs-i18n";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// ========== config ==========
import app_config from "./config/app.config";
import database_config from "./config/database.config";

// ========== app =============
import { UsersModule } from "./app/users/users.module";
import { AuthModule } from "./app/auth/auth.module";
import { UserRolesModule } from "./app/user-roles/user-roles.module";
import { ProductsModule } from "./app/products/products.module";
import { VendorsModule } from "./app/vendors/vendors.module";
import { VendorProductsModule } from "./app/vendor-products/vendor-products.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [app_config, database_config],
      isGlobal: true
    }),
    {
      ...I18nModule.forRoot({
        fallbackLanguage: "en",
        loaderOptions: {
          path: "src/resources/i18n/",
          watch: true
        }
      }),
      global: true
    },
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database"),
      inject: [ConfigService]
    }),
    // ===== app =====
    AuthModule,
    UserRolesModule,
    UsersModule,
    ProductsModule,
    VendorsModule,
    VendorProductsModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {
}
