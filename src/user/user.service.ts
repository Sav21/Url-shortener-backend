import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "./types/user.type";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
    };
  }
}
