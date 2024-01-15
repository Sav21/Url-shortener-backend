import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @Length(4, 32)
  username!: string;

  @ApiProperty()
  @Length(8, 64)
  password!: string;
}
