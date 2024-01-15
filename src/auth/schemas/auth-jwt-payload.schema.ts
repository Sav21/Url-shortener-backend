import { z } from "zod";

export const authJwtPayloadSchema = z.object({
  userId: z.string(),
});
