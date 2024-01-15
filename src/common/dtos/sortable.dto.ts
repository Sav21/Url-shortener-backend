import { ApiPropertyOptional } from "@nestjs/swagger";

export function SortableDto<K extends string>(keys: K[]) {
  const keysWithSortOrder = [
    ...keys.flatMap((key) => [`+${key}`, `-${key}`] as const),
  ];

  class SortableDto {
    @ApiPropertyOptional({ enum: keysWithSortOrder })
    sortBy?: `+${K}` | `-${K}`;
  }

  return SortableDto;
}
