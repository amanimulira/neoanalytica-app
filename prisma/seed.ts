import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "neo2026",
    12
  );
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@neoanalytica.co.uk" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@neoanalytica.co.uk",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // Seed sample subscribers
  const subscribers = [
    { email: "james@fintech-co.com", name: "James Harrison", source: "linkedin" },
    { email: "sarah@ecommerce.io", name: "Sarah Palmer", source: "google" },
    { email: "mike@healthtech.co.uk", name: "Michael King", source: "website" },
    { email: "emma@datastart.io", name: "Emma Chen", source: "lead_magnet" },
    { email: "david@scaleco.com", name: "David Wright", source: "linkedin" },
  ];

  for (const sub of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: sub.email },
      update: {},
      create: sub,
    });
  }

  // Seed sample deals
  const deals = [
    { company: "FinTech Co", contactName: "James H.", contactEmail: "james@fintech-co.com", value: 18000, status: "closed_won", source: "linkedin", packageType: "etl_overhaul" },
    { company: "Ecom Scale", contactName: "Sarah P.", contactEmail: "sarah@ecommerce.io", value: 24000, status: "closed_won", source: "google", packageType: "pipeline_builder" },
    { company: "HealthTech", contactName: "Michael K.", contactEmail: "mike@healthtech.co.uk", value: 12000, status: "closed_won", source: "website", packageType: "pipeline_builder" },
    { company: "DataStart", contactName: "Emma C.", contactEmail: "emma@datastart.io", value: 35000, status: "proposal", source: "linkedin", packageType: "streaming" },
    { company: "ScaleCo", contactName: "David W.", contactEmail: "david@scaleco.com", value: 22000, status: "negotiation", source: "email", packageType: "etl_overhaul" },
    { company: "RetailAI", contactName: "Lisa M.", contactEmail: "lisa@retailai.com", value: 28000, status: "proposal", source: "google", packageType: "etl_overhaul" },
  ];

  for (const deal of deals) {
    await prisma.deal.create({ data: deal });
  }

  // Seed sample metrics for last 30 days
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const dayMetrics = [
      { category: "visitors", channel: "organic", metric: "count", value: 30 + Math.floor(Math.random() * 25) },
      { category: "visitors", channel: "paid", metric: "count", value: 20 + Math.floor(Math.random() * 20) },
      { category: "visitors", channel: "direct", metric: "count", value: 10 + Math.floor(Math.random() * 15) },
      { category: "visitors", channel: "referral", metric: "count", value: 5 + Math.floor(Math.random() * 12) },
      { category: "leads", channel: "total", metric: "count", value: 2 + Math.floor(Math.random() * 6) },
      { category: "consultations", channel: "total", metric: "count", value: Math.random() > 0.6 ? 1 : 0 },
    ];

    for (const m of dayMetrics) {
      await prisma.dashboardMetric.create({
        data: { date, ...m },
      });
    }
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
