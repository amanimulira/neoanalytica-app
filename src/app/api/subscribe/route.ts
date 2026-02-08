import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string().default("website"),
  magnetName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = subscribeSchema.parse(body);

    // Upsert subscriber (don't fail on duplicates)
    const subscriber = await prisma.subscriber.upsert({
      where: { email: data.email },
      update: {
        // Re-activate if previously unsubscribed
        status: "active",
        source: data.source,
        updatedAt: new Date(),
      },
      create: {
        email: data.email,
        name: data.name,
        source: data.source,
      },
    });

    // Track lead magnet download if applicable
    if (data.magnetName) {
      await prisma.leadMagnetDownload.create({
        data: {
          subscriberId: subscriber.id,
          magnetName: data.magnetName,
        },
      });
    }

    return NextResponse.json(
      {
        message: "You're in! Check your inbox for the download link.",
        subscriberId: subscriber.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET: list subscribers (admin only — protected in dashboard)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { downloads: true },
    }),
    prisma.subscriber.count(),
  ]);

  return NextResponse.json({ subscribers, total, page, limit });
}
