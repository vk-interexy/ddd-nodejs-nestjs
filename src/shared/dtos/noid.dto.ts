import { ApiProperty } from "@nestjs/swagger";

export abstract class NoIDDto {
  @ApiProperty({
    description: "Date created"
  })
  created!: number;

  @ApiProperty({
    description: "Date updated"
  })
  updated!: number;
}