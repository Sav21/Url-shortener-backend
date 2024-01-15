import { Injectable } from "@nestjs/common";
import { authJwtPayloadSchema } from "./schemas/auth-jwt-payload.schema";
import { UserService } from "src/user/user.service";
import { User } from "src/user/types/user.type";
import { JwtService } from "@nestjs/jwt";
import { z } from "zod";

@Injectable()
export class AuthJwtService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(jwtPayload: unknown): Promise<User | null> {
    const payload = authJwtPayloadSchema.safeParse(jwtPayload);
    if (!payload.success) {
      return null;
    }

    const user = await this.userService.findById(payload.data.userId);
    return user;
  }

  async sign(user: User): Promise<string> {
    // Explicit type to be sure we sign the same shape that we later validate
    const payload: z.infer<typeof authJwtPayloadSchema> = {
      userId: user.id,
    };
    return this.jwtService.signAsync(payload);
  }
}
