import { ApiProperty } from "@nestjs/swagger";

export abstract class IDDto {
  @ApiProperty({
    description: "id"
  })
  id!: number;

  @ApiProperty({
    description: "Date created"
  })
  created!: number;

  @ApiProperty({
    description: "Date updated"
  })
  updated!: number;
}