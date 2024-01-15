import { Controller, Get, Param, Res } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { Response } from "express";
import { ShortenedLinkService } from "./shortened-link.service";

@Controller("")
export class ShortenedLinkRedirectController {
  constructor(private readonly shortenedLinkService: ShortenedLinkService) {}

  @ApiExcludeEndpoint()
  @Get(":shortenedLinkSlug")
  async redirect(
    @Param("shortenedLinkSlug") shortenedLinkSlug: string,
    @Res() res: Response,
  ): Promise<void> {
    const shortenedLink = await this.shortenedLinkService.findBySlug(
      shortenedLinkSlug,
    );

    if (!shortenedLink) {
      res.status(404).send("Not found");
      return;
    }

    res.redirect(shortenedLink.url);
  }
}
