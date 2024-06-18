import { Migration } from '@mikro-orm/migrations';

export class Migration20230331165003 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "products" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "type" text not null, "name" varchar(255) not null, "image_url" varchar(255) not null, "price" int not null default 0, constraint "products_pkey" primary key ("id"));');

    this.addSql('create table "user_roles" ("id" bigserial not null, "type" text not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, "permissions" text[] not null, "is_default" boolean not null, constraint "user_roles_pkey" primary key ("id", "type"));');
    this.addSql('create index "ix_user_roles_type" on "user_roles" ("type");');
    this.addSql('create index "ix_user_roles_default_role" on "user_roles" ("type", "is_default");');
    this.addSql('alter table "user_roles" add constraint "ix_user_roles_name" unique ("name");');

    this.addSql('create table "user" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "email" varchar(255) not null, "phone" varchar(255) null, "password" varchar(255) not null, "role_id" bigint null, "role_type" text null, "status" text check ("status" in (\'active\', \'inactive\')) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "ix_user_role" on "user" ("role_type");');
    this.addSql('create index "ix_user_phone_acc" on "user" ("phone", "password");');
    this.addSql('create index "ix_user_email_acc" on "user" ("email", "password");');
    this.addSql('alter table "user" add constraint "ix_user_phone" unique ("phone", "role_type");');
    this.addSql('alter table "user" add constraint "ix_user_email" unique ("email", "role_type");');

    this.addSql('create table "user_details" ("id" uuid null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "middle_name" varchar(255) null, constraint "user_details_pkey" primary key ("id"));');
    this.addSql('alter table "user_details" add constraint "user_details_id_unique" unique ("id");');

    this.addSql('create table "vendors" ("id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, "type" text not null, "image_url" varchar(255) not null, constraint "vendors_pkey" primary key ("id"));');

    this.addSql('create table "vendor_products" ("vendor_id" uuid not null, "product_id" uuid not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "price" int not null, constraint "vendor_products_pkey" primary key ("vendor_id", "product_id"));');

    this.addSql('alter table "user" add constraint "user_role_id_role_type_foreign" foreign key ("role_id", "role_type") references "user_roles" ("id", "type") on update cascade on delete set null;');

    this.addSql('alter table "user_details" add constraint "user_details_id_foreign" foreign key ("id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "vendor_products" add constraint "vendor_products_vendor_id_foreign" foreign key ("vendor_id") references "vendors" ("id") on update cascade;');
    this.addSql('alter table "vendor_products" add constraint "vendor_products_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "vendor_products" drop constraint "vendor_products_product_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_role_id_role_type_foreign";');

    this.addSql('alter table "user_details" drop constraint "user_details_id_foreign";');

    this.addSql('alter table "vendor_products" drop constraint "vendor_products_vendor_id_foreign";');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "user_roles" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_details" cascade;');

    this.addSql('drop table if exists "vendors" cascade;');

    this.addSql('drop table if exists "vendor_products" cascade;');
  }

}
