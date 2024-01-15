import { ApiProperty } from "@nestjs/swagger";

export function PagePaginatedResponseDto<T extends { new (): any }>(dto: T) {
  class PagePaginatedResponseDto {
    @ApiProperty({ type: [dto] })
    data!: InstanceType<T>[];

    @ApiProperty({
      type: String,
      description: "Page numer that was requested.",
    })
    page!: number;

    @ApiProperty({
      type: Number,
      description: "The number of results requested per page.",
    })
    perPage!: number;

    @ApiProperty({
      type: Number,
      description: "The total number of results.",
    })
    total!: number;
  }

  return PagePaginatedResponseDto;
}
