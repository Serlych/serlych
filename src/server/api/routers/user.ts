import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, input.id),
      });
    }),
});
