import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(posts).values({
        title: input.title,
        createdById: ctx.session.user.id,
      });
    }),

  getLatestPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      where: eq(posts.isLive, true),
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      columns: {
        id: true,
        title: true,
        summary: true,
        tags: true,
        createdAt: true,
        createdBy: true,
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.query.posts.findFirst({
        where: (posts, { eq, and }) =>
          and(eq(posts.id, input.id), eq(posts.isLive, true)),
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
