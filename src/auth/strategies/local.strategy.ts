import { IStrategyOptions, Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "src/user/types/user.type";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({} satisfies IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.login(username, password);
    if (!user) {
      throw new UnauthorizedException("Invalid username or password");
    }
    return user;
  }
}
