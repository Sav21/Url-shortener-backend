import { ApiProperty } from "@nestjs/swagger";

export function CursorPaginatedResponseDto<T extends { new (): any }>(dto: T) {
  class CursorPaginatedResponseDto {
    @ApiProperty({ type: [dto] })
    data!: InstanceType<T>[];

    @ApiProperty({
      type: String,
      nullable: true,
      description:
        "The cursor for the next page of results. `null` if there are no more results.",
    })
    cursor!: string | null;
  }

  return CursorPaginatedResponseDto;
}
