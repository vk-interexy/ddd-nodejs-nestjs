import { ApiProperty } from "@nestjs/swagger";

import { UUIDDto } from "src/shared/dtos/uuid.dto";

import { UserDetailEntity } from "src/app/users/entities/user-detail.entity";

export class UserDetailDto extends UUIDDto {
  @ApiProperty({
    description: "User first name"
  })
  firstName!: string;

  @ApiProperty({
    description: "User last name"
  })
  lastName!: string;

  @ApiProperty({
    description: "User middle name",
    required: false
  })
  middleName?: string;

  static fromEntity(entity: UserDetailEntity) {
    const it = new UserDetailDto();
    it.id = entity.id;
    it.created = entity.created.valueOf();
    it.updated = entity.updated.valueOf();
    it.firstName = entity.firstName;
    it.lastName = entity.lastName;
    it.middleName = entity.middleName;
    return it;
  }

  static fromEntities(entities: UserDetailEntity[]) {
    return entities.map(entity => this.fromEntity(entity));
  }
}