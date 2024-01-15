import { ApiProperty } from "@nestjs/swagger";

export class ShortenedLinkDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  ownerId!: string;

  @ApiProperty()
  shortUrl!: string;
}
