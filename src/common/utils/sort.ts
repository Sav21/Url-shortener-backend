export type DtoSortBy<K extends string> = `+${K}` | `-${K}`;

export const dtoSortByToPrismaOrderBy = <K extends string>(
  key: DtoSortBy<K> | undefined,
): Partial<Record<K, "asc" | "desc">> => {
  if (key === undefined) {
    return {};
  }

  const keyWithoutOrder = key.slice(1) as K;
  const order = (() => {
    if (key.startsWith("+")) {
      return "asc";
    } else if (key.startsWith("-")) {
      return "desc";
    } else {
      throw new Error(`Invalid sort key: ${key}`);
    }
  })();

  // SAFETY: Can't prove to typescript that `keyWithoutOrder` is actually
  // `K`, so we type-assert as `any` for it to accept the return type.
  return { [keyWithoutOrder]: order } as any;
};
