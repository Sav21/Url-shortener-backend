import { ShortenedLinkDto } from "./shortened-link.dto";
import { PagePaginatedResponseDto } from "src/common/dtos/page-paginated-respose.dto";

export class ShortenedLinksListResponseDto extends PagePaginatedResponseDto(
  ShortenedLinkDto,
) {}
