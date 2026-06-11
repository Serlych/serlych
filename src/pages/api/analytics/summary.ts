import { desc, sql } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "~/env";
import { db } from "~/server/db";
import { analyticsEvents } from "~/server/db/schema";

function bearerToken(req: NextApiRequest) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  if (!env.ANALYTICS_ADMIN_TOKEN) {
    return res.status(501).json({ message: "Analytics summary disabled. Set ANALYTICS_ADMIN_TOKEN." });
  }

  if (bearerToken(req) !== env.ANALYTICS_ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const [totals, byEvent, byPath, recentDownloads] = await Promise.all([
    db
      .select({
        total: sql<number>`count(*)::int`,
        uniqueVisitors: sql<number>`count(distinct ${analyticsEvents.ipHash})::int`,
      })
      .from(analyticsEvents),
    db
      .select({
        name: analyticsEvents.name,
        total: sql<number>`count(*)::int`,
      })
      .from(analyticsEvents)
      .groupBy(analyticsEvents.name)
      .orderBy(desc(sql<number>`count(*)::int`)),
    db
      .select({
        path: analyticsEvents.path,
        total: sql<number>`count(*)::int`,
      })
      .from(analyticsEvents)
      .groupBy(analyticsEvents.path)
      .orderBy(desc(sql<number>`count(*)::int`))
      .limit(20),
    db
      .select({
        path: analyticsEvents.path,
        metadata: analyticsEvents.metadata,
        createdAt: analyticsEvents.createdAt,
      })
      .from(analyticsEvents)
      .where(sql`${analyticsEvents.name} = 'resume_download_click'`)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(20),
  ]);

  return res.status(200).json({
    totals: totals[0] ?? { total: 0, uniqueVisitors: 0 },
    byEvent,
    byPath,
    recentDownloads,
  });
}
