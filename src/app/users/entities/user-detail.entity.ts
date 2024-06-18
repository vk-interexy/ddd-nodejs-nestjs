import { Entity, Property, OneToOne, EntityRepositoryType } from "@mikro-orm/core";

import { UUIDEntity } from "src/shared/entities/uuid.entity";

import { UserEntity } from "src/app/users/entities/user.entity";
import { UserDetailRepo } from "src/app/users/repos/user-detail.repo";

@Entity({ tableName: "user_details", customRepository: () => UserDetailRepo })
export class UserDetailEntity extends UUIDEntity {
  [EntityRepositoryType]?: UserDetailRepo;

  @Property({ name: "first_name" })
  firstName!: string;

  @Property({ name: "last_name" })
  lastName!: string;

  @Property({ name: "middle_name", nullable: true })
  middleName?: string;

  @OneToOne(() => UserEntity, user => user.detail, {
    lazy: true,
    nullable: true,
    owner: true,
    joinColumn: "id",
    inverseJoinColumn: "id"
  })
  user?: UserEntity;
}