import { ApiPropertyOptional } from "@nestjs/swagger";

export class CursorPaginatedDto {
  @ApiPropertyOptional({
    type: String,
    description:
      "The cursor for the next page of results. Omit for the first page.",
  })
  cursor?: string | undefined;

  @ApiPropertyOptional({
    type: Number,
    description: "The number of results to return per page.",
  })
  take?: number | undefined;
}
