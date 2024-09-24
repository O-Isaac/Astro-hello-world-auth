import { z } from "zod";

export const userSchema = z.object({
  password: z.string().min(5),
  username: z.string().min(5),
});
