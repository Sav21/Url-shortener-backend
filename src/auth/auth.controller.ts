import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RequestingUser } from "./decorators/requesting-user.decorator";
import { RegisterDto } from "./dtos/register.dto";
import { AuthService } from "./auth.service";
import { AuthJwtService } from "./auth-jwt.service";
import { User } from "src/user/types/user.type";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from "@nestjs/swagger";
import { AuthResponseDto } from "./dtos/auth-response.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private authJwtService: AuthJwtService,
  ) {}

  @ApiOperation({
    summary: "Login",
    tags: ["auth"],
  })
  @ApiBody({
    type: (() => {
      class RegisterDto {
        @ApiProperty()
        username!: string;

        @ApiProperty()
        password!: string;
      }

      return RegisterDto;
    })(),
  })
  @ApiOkResponse({ type: AuthResponseDto })
  @Post("login")
  @UseGuards(LocalAuthGuard)
  // TODO: Type this
  async login(@RequestingUser() user: User): Promise<AuthResponseDto> {
    const token = await this.authJwtService.sign(user);
    return { user, token };
  }

  @ApiOperation({
    summary: "Register",
    tags: ["auth"],
  })
  @ApiOkResponse({ type: AuthResponseDto })
  @Post("register")
  async register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.authService.register(body);
    const token = await this.authJwtService.sign(user);
    return { user, token };
  }
}
