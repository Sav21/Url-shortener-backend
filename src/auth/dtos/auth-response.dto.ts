import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/user/dtos/user.dto";

export class AuthResponseDto {
  @ApiProperty()
  user!: UserDto;

  @ApiProperty()
  token!: string;
}
