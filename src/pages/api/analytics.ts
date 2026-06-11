import { createHash } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { env } from "~/env";
import { db } from "~/server/db";
import { analyticsEvents } from "~/server/db/schema";

const analyticsEventSchema = z.object({
  name: z.enum(["page_view", "resume_download_click"]),
  path: z.string().min(1).max(2048),
  referrer: z.string().max(2048).optional(),
  metadata: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
});

function requestIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0]?.trim();
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0];
  }

  return req.socket.remoteAddress;
}

function hashIp(ip: string | undefined) {
  if (!ip) {
    return null;
  }

  const salt = env.ANALYTICS_SALT ?? env.NEXTAUTH_SECRET;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const parsed = analyticsEventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid analytics event." });
  }

  const userAgent = req.headers["user-agent"];

  await db.insert(analyticsEvents).values({
    name: parsed.data.name,
    path: parsed.data.path,
    referrer: parsed.data.referrer,
    userAgent: typeof userAgent === "string" ? userAgent : null,
    ipHash: hashIp(requestIp(req)),
    metadata: parsed.data.metadata,
  });

  return res.status(204).end();
}
