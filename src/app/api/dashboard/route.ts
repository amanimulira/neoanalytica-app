import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Subscribers
  const [totalSubscribers, recentSubscribers, subscribersBySource] =
    await Promise.all([
      prisma.subscriber.count({ where: { status: "active" } }),
      prisma.subscriber.count({
        where: { createdAt: { gte: thirtyDaysAgo }, status: "active" },
      }),
      prisma.subscriber.groupBy({
        by: ["source"],
        _count: true,
        where: { status: "active" },
      }),
    ]);

  // Lead magnet downloads
  const [totalDownloads, recentDownloads, downloadsByMagnet] =
    await Promise.all([
      prisma.leadMagnetDownload.count(),
      prisma.leadMagnetDownload.count({
        where: { downloadedAt: { gte: thirtyDaysAgo } },
      }),
      prisma.leadMagnetDownload.groupBy({
        by: ["magnetName"],
        _count: true,
      }),
    ]);

  // Deals / Pipeline
  const deals = await prisma.deal.findMany();
  const pipeline = {
    proposalsOut: deals.filter(
      (d) => d.status === "proposal" || d.status === "negotiation"
    ).length,
    projectedRevenue: deals
      .filter((d) => d.status === "proposal" || d.status === "negotiation")
      .reduce((sum, d) => sum + d.value, 0),
    closedWon: deals.filter((d) => d.status === "closed_won").length,
    closedRevenue: deals
      .filter((d) => d.status === "closed_won")
      .reduce((sum, d) => sum + d.value, 0),
    closedLost: deals.filter((d) => d.status === "closed_lost").length,
    dealsBySource: deals.reduce(
      (acc, d) => {
        acc[d.source] = (acc[d.source] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };

  // Daily visitor metrics
  const visitorMetrics = await prisma.dashboardMetric.findMany({
    where: {
      date: { gte: thirtyDaysAgo },
      category: "visitors",
    },
    orderBy: { date: "asc" },
  });

  const visitorsBySource: Record<string, number> = {};
  const dailyVisitors: { date: string; total: number }[] = [];
  const dateMap: Record<string, number> = {};

  for (const m of visitorMetrics) {
    visitorsBySource[m.channel] =
      (visitorsBySource[m.channel] || 0) + m.value;
    const dateKey = m.date.toISOString().split("T")[0];
    dateMap[dateKey] = (dateMap[dateKey] || 0) + m.value;
  }

  for (const [date, total] of Object.entries(dateMap)) {
    dailyVisitors.push({ date, total: Math.round(total) });
  }

  // Outreach campaigns
  const campaigns = await prisma.outreachCampaign.findMany({
    where: { status: "active" },
  });

  const outreach = {
    linkedin: {
      sent: campaigns
        .filter((c) => c.channel === "linkedin")
        .reduce((s, c) => s + c.totalSent, 0),
      replied: campaigns
        .filter((c) => c.channel === "linkedin")
        .reduce((s, c) => s + c.totalReplied, 0),
      booked: campaigns
        .filter((c) => c.channel === "linkedin")
        .reduce((s, c) => s + c.totalBooked, 0),
    },
    email: {
      sent: campaigns
        .filter((c) => c.channel === "email")
        .reduce((s, c) => s + c.totalSent, 0),
      opened: campaigns
        .filter((c) => c.channel === "email")
        .reduce((s, c) => s + c.totalOpened, 0),
      replied: campaigns
        .filter((c) => c.channel === "email")
        .reduce((s, c) => s + c.totalReplied, 0),
      booked: campaigns
        .filter((c) => c.channel === "email")
        .reduce((s, c) => s + c.totalBooked, 0),
    },
  };

  return NextResponse.json({
    subscribers: {
      total: totalSubscribers,
      recent: recentSubscribers,
      bySource: subscribersBySource.reduce(
        (acc, s) => {
          acc[s.source] = s._count;
          return acc;
        },
        {} as Record<string, number>
      ),
    },
    downloads: {
      total: totalDownloads,
      recent: recentDownloads,
      byMagnet: downloadsByMagnet.reduce(
        (acc, d) => {
          acc[d.magnetName] = d._count;
          return acc;
        },
        {} as Record<string, number>
      ),
    },
    visitors: {
      total: Object.values(visitorsBySource).reduce((s, v) => s + v, 0),
      bySource: visitorsBySource,
      daily: dailyVisitors,
    },
    pipeline,
    outreach,
    deals: deals.map((d) => ({
      id: d.id,
      company: d.company,
      value: d.value,
      status: d.status,
      source: d.source,
      packageType: d.packageType,
    })),
  });
}
