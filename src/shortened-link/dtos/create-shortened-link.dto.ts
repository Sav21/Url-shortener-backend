import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";

export class CreateShortenedLinkDto {
  @ApiProperty()
  @IsUrl({ disallow_auth: true, protocols: ["http", "https"] })
  url!: string;
}
