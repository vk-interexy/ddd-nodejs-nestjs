import { Entity, Property, Enum, OneToMany, Index, EntityRepositoryType, Unique, EnumType, PrimaryKey } from "@mikro-orm/core";

import { UserEntity } from "src/app/users/entities/user.entity";
import { IDEntity } from "src/shared/entities/id.entity";

import { UserRoles } from "src/app/user-roles/enums/user-roles.enum";
import { UserPermissions } from "src/app/user-roles/enums/user-permissions.enum";
import { UserRolesRepo } from "src/app/user-roles/repos/user-roles.repo";

@Entity({ tableName: "user_roles", customRepository: () => UserRolesRepo })
@Index({ name: "ix_user_roles_default_role", properties: ["type", "isDefault"] })
@Index({ name: "ix_user_roles_type", properties: ["type"] })
@Unique({ name: "ix_user_roles_name", properties: ["name"] })
export class UserRoleEntity extends IDEntity {
  [EntityRepositoryType]?: UserRolesRepo;

  @PrimaryKey({ name: "type", type: "text" })
  type!: UserRoles;

  @Property({ name: "name" })
  name!: string;

  @Enum({ type: EnumType, name: "permissions", array: true, items: () => UserPermissions })
  permissions!: UserPermissions[];

  @Property({ name: "is_default", type: "boolean" })
  isDefault!: boolean;

  @OneToMany(() => UserEntity, e => e.role)
  users?: UserEntity[];
}
