import { ApiPropertyOptional, IntersectionType } from "@nestjs/swagger";
import { PagePaginatedDto } from "src/common/dtos/page-paginated.dto";
import { SortableDto } from "src/common/dtos/sortable.dto";

export class ListShortenedLinksDto extends IntersectionType(
  PagePaginatedDto,
  SortableDto(["createdAt"]),
) {
  @ApiPropertyOptional({
    type: String,
    description: "Search for shortened links by the original url.",
  })
  search?: string | undefined;
}
