import { Module } from "@nestjs/common";
import { ShortenedLinkService } from "./shortened-link.service";
import { ShortenedLinkController } from "./shortened-link.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ShortenedLinkRedirectController } from "./shortened-link-redirect.controller";

@Module({
  imports: [PrismaModule],
  providers: [ShortenedLinkService],
  controllers: [ShortenedLinkController, ShortenedLinkRedirectController],
  exports: [ShortenedLinkService],
})
export class ShortenedLinkModule {}
