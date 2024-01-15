import { ApiPropertyOptional } from "@nestjs/swagger";

export class PagePaginatedDto {
  @ApiPropertyOptional({
    type: Number,
    description: "Page number. Omit or set to 0 to get the first page.",
  })
  page?: number | undefined;

  @ApiPropertyOptional({
    type: Number,
    description: "The number of results to return per page.",
  })
  perPage?: number | undefined;
}
