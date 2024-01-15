import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { RequestingUser } from "src/auth/decorators/requesting-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/user/types/user.type";
import { CreateShortenedLinkDto } from "./dtos/create-shortened-link.dto";
import { ListShortenedLinksDto } from "./dtos/list-shortened-links.dto";
import { ShortenedLinkDto } from "./dtos/shortened-link.dto";
import { ShortenedLinksListResponseDto } from "./dtos/shortened-links-list-response.dto";
import { ShortenedLinkService } from "./shortened-link.service";
import { ShortenedLink } from "./types/shortened-link.type";

@Controller("shortened-link")
export class ShortenedLinkController {
  constructor(
    private readonly shortenedLinkService: ShortenedLinkService,
    private readonly configService: ConfigService,
  ) {}

  private shortenedLinkToDto(shortenedLink: ShortenedLink): ShortenedLinkDto {
    const appUrl = this.configService.getOrThrow<string>("APP_URL");
    return {
      ...shortenedLink,
      shortUrl: `${appUrl}/${shortenedLink.slug}`,
    };
  }

  @ApiOperation({
    summary: "Create a shortened link",
    tags: ["shortened-link"],
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ShortenedLinkDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @RequestingUser() user: User,
    @Body() createShortenedLinkDto: CreateShortenedLinkDto,
  ): Promise<ShortenedLinkDto> {
    const shortenedLink = await this.shortenedLinkService.create({
      owner: user,
      data: createShortenedLinkDto,
    });

    return this.shortenedLinkToDto(shortenedLink);
  }

  @ApiOperation({
    summary: "Get all requesting user's shortened links",
    tags: ["shortened-link"],
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ShortenedLinksListResponseDto })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findMyLinks(
    @RequestingUser() user: User,
    @Query() query: ListShortenedLinksDto,
  ): Promise<ShortenedLinksListResponseDto> {
    const shortenedLinks =
      await this.shortenedLinkService.findAllByUserPaginated({
        user,
        page: query.page,
        perPage: query.perPage,
        sortBy: query.sortBy,
        search: query.search,
      });

    return {
      data: shortenedLinks.data.map((shortenedLink) =>
        this.shortenedLinkToDto(shortenedLink),
      ),
      page: shortenedLinks.page,
      perPage: shortenedLinks.perPage,
      total: shortenedLinks.total,
    };
  }
}
