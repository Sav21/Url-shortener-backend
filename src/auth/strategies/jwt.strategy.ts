import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { User } from "src/user/types/user.type";
import { AuthJwtService } from "../auth-jwt.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authJwtService: AuthJwtService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET"),
    } satisfies StrategyOptions);
  }

  async validate(jwtPayload: unknown): Promise<User> {
    const user = await this.authJwtService.validate(jwtPayload);
    if (!user) {
      throw new UnauthorizedException("Invalid user in JWT");
    }
    return user;
  }
}
