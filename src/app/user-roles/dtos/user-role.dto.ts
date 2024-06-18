import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsString, ValidateNested } from "class-validator";

import { UserRoles } from "src/app/user-roles/enums/user-roles.enum";
import { UserPermissions } from "src/app/user-roles/enums/user-permissions.enum";
import { IDDto } from "src/shared/dtos/id.dto";
import { UserDto } from "src/app/users/dtos/user.dto";
import { UserRoleEntity } from "src/app/user-roles/entities/user-role.entity";

export class UserRoleDto extends IDDto {
  @ApiProperty({
    description: "User role type",
    isArray: false,
    enum: UserRoles
  })
  @IsEnum(UserRoles)
  type: UserRoles;

  @ApiProperty({
    description: "User role name"
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "User role permissions",
    isArray: true,
    enum: UserPermissions
  })
  @IsArray({ context: UserPermissions })
  permissions: UserPermissions[];

  @ApiProperty({
    description: "Is role default"
  })
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty({
    description: "List of users",
    required: false,
    isArray: true,
    type: () => UserDto
  })
  @ValidateNested({ context: UserDto })
  users?: UserDto[];

  public static fromEntity(entity: UserRoleEntity) {
    const it = new UserRoleDto();
    it.id = entity.id;
    it.created = new Date(entity.created).valueOf();
    it.updated = new Date(entity.updated).valueOf();
    it.type = entity.type;
    it.name = entity.name;
    it.permissions = entity.permissions;
    it.isDefault = entity.isDefault;

    it.users = UserDto.fromEntities(entity.users);
    return it;
  }

  static fromEntities(entities?: UserRoleEntity[]) {
    if (!entities?.map) { return; }
    return entities.map(entity => this.fromEntity(entity));
  }
}
