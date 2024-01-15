import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { User } from "src/user/types/user.type";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user || !user.password) {
      return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
    };
  }

  async register(data: { username: string; password: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.prismaService.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      username: user.username,
    };
  }
}
