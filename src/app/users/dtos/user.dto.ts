import { ApiProperty } from "@nestjs/swagger";

import { UUIDDto } from "src/shared/dtos/uuid.dto";

import { UserRoles } from "src/app/user-roles/enums/user-roles.enum";
import { UserEntity } from "src/app/users/entities/user.entity";

export class UserDto extends UUIDDto {
  @ApiProperty({
    description: "User role id"
  })
  roleId!: number;

  @ApiProperty({
    description: "User role type",
    enum: UserRoles
  })
  roleType!: UserRoles;

  @ApiProperty({
    description: "User email"
  })
  email!: string;

  @ApiProperty({
    description: "User phone",
    required: false
  })
  phone?: string;

  static fromEntity(entity?: UserEntity) {
    if (!entity) { return; }
    const it = new UserDto();
    it.id = entity.id;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.roleId = entity.roleId;
    it.roleType = entity.roleType;
    it.email = entity.email;
    it.phone = entity.phone;

    return it;
  }

  static fromEntities(entities?: UserEntity[]) {
    if (!entities?.map) { return; }
    return entities.map(entity => this.fromEntity(entity));
  }
}