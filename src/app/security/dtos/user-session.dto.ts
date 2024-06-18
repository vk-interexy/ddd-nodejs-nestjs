import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";

// ============ enums ===============
import { UserPermissions } from "src/app/user-roles/enums/user-permissions.enum";
import { UserRoles } from "src/app/user-roles/enums/user-roles.enum";

// ============ entities =============
import { UserEntity } from "src/app/users/entities/user.entity";

export class UserSessionDto {
  @ApiProperty({
    description: "User id"
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "User email"
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "User role id"
  })
  @IsNumber()
  role_id: number;

  @ApiProperty({
    description: "User role type"
  })
  @IsString()
  role_type: UserRoles;

  @ApiProperty({
    description: "User permissions",
    isArray: true,
    type: UserPermissions
  })
  @IsArray({ context: UserPermissions })
  permissions: UserPermissions[];

  constructor() {
  }

  public static from(dto: UserSessionDto): UserSessionDto {
    return {
      id: dto.id,
      role_id: dto.role_id,
      role_type: dto.role_type,
      email: dto.email,
      permissions: dto.permissions
    };
  }

  public static fromEntity(entity: UserEntity, permissions: UserPermissions[]): UserSessionDto {
    return {
      id: entity.id,
      email: entity.email,
      role_id: entity.roleId,
      role_type: entity.roleType,
      permissions
    };
  }
}