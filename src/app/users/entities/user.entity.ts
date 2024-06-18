import { Entity, Property, Enum, OneToOne, ManyToOne, EntityRepositoryType, Unique, Index } from "@mikro-orm/core";

import { UUIDEntity } from "src/shared/entities/uuid.entity";

import { UserRoles } from "src/app/user-roles/enums/user-roles.enum";
import { UserRoleEntity } from "src/app/user-roles/entities/user-role.entity";

import { UserDetailEntity } from "src/app/users/entities/user-detail.entity";
import { UserStatuses } from "src/app/users/enums/user-statuses.enum";
import { UserRepo } from "src/app/users/repos/user.repo";

@Entity({ tableName: "user", customRepository: () => UserRepo })
@Unique({ name: "ix_user_email", properties: ["email", "roleType"] })
@Index({ name: "ix_user_email_acc", properties: ["email", "password"] })
@Unique({ name: "ix_user_phone", properties: ["phone", "roleType"] })
@Index({ name: "ix_user_phone_acc", properties: ["phone", "password"] })
@Index({ name: "ix_user_role", properties: ["roleType"] })
export class UserEntity extends UUIDEntity {
  [EntityRepositoryType]?: UserRepo;

  @Property({ name: "email" })
  email!: string;

  @Property({ name: "phone", nullable: true })
  phone?: string;

  @Property({ name: "password" })
  password!: string;

  @Property({ name: "role_id" })
  roleId!: number;

  @Enum({ name: "role_type", array: false, items: () => UserRoles })
  roleType!: UserRoles;

  @Enum({ name: "status", array: false, items: () => UserStatuses })
  status!: UserStatuses;

  @OneToOne(() => UserDetailEntity, detail => detail.user, { nullable: true, joinColumn: "id", inverseJoinColumn: "id" })
  detail?: UserDetailEntity;

  @ManyToOne({
    entity: () => UserRoleEntity,
    inversedBy: e => e.users,
    joinColumns: ["role_id", "role_type"],
    referencedColumnNames: ["id", "type"],
    nullable: true,
    lazy: true,
  })
  role?: UserRoleEntity;
}