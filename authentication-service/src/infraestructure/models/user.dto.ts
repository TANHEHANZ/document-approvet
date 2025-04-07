import { z } from "zod";
const userSchema = z.object({
  id: z.string(),
  authMethods: z.string(),
  currentProvider: z.string(),
  role: z.object({
    id: z.string(),
    name: z.string(),
    permissions: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  }),
});
export default userSchema;
