import { Injectable } from "@nestjs/common";
import * as cryptoRandomString from "crypto-random-string";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/types/user.type";
import { ShortenedLink } from "./types/shortened-link.type";
import { dtoSortByToPrismaOrderBy } from "src/common/utils/sort";

@Injectable()
export class ShortenedLinkService {
  constructor(private prismaService: PrismaService) {}

  async create(args: {
    owner: User;
    data: { url: string };
  }): Promise<ShortenedLink> {
    try {
      new URL(args.data.url);
    } catch (error) {
      throw new Error("Invalid URL");
    }

    const shortenedLink = await this.prismaService.shortenedLink.create({
      data: {
        slug: cryptoRandomString({ type: "alphanumeric", length: 10 }),
        url: args.data.url,
        ownerId: args.owner.id,
      },
    });

    return {
      id: shortenedLink.id,
      slug: shortenedLink.slug,
      url: shortenedLink.url,
      ownerId: shortenedLink.ownerId,
      createdAt: shortenedLink.createdAt,
    };
  }

  async findBySlug(slug: string): Promise<ShortenedLink | null> {
    const shortenedLink = await this.prismaService.shortenedLink.findUnique({
      where: { slug },
    });

    if (!shortenedLink) {
      return null;
    }

    return {
      id: shortenedLink.id,
      slug: shortenedLink.slug,
      url: shortenedLink.url,
      ownerId: shortenedLink.ownerId,
      createdAt: shortenedLink.createdAt,
    };
  }

  async findAllByUserPaginated(args: {
    user: User;
    page?: number | undefined;
    perPage?: number | undefined;
    sortBy?: "+createdAt" | "-createdAt" | undefined;
    search?: string | undefined;
  }): Promise<{
    data: ShortenedLink[];
    page: number;
    perPage: number;
    total: number;
  }> {
    const page = Math.max(1, args.page ?? 1);
    const perPage = Math.min(Math.max(1, args.perPage ?? 10), 20);
    const orderBy = dtoSortByToPrismaOrderBy(args.sortBy);

    const whereFilter = {
      ownerId: args.user.id,
      ...(!!args.search && { url: { contains: args.search } }),
    };

    const [shortenedLinks, total] = await this.prismaService.$transaction([
      this.prismaService.shortenedLink.findMany({
        where: whereFilter,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy,
      }),
      this.prismaService.shortenedLink.count({
        where: whereFilter,
      }),
    ]);
    return {
      data: shortenedLinks.map((shortenedLink) => ({
        id: shortenedLink.id,
        slug: shortenedLink.slug,
        url: shortenedLink.url,
        ownerId: shortenedLink.ownerId,
        createdAt: shortenedLink.createdAt,
      })),
      page,
      perPage,
      total,
    };
  }
}
