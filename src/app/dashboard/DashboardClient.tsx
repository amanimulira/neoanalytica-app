"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  subscribers: { total: number; recent: number; bySource: Record<string, number> };
  downloads: { total: number; recent: number; byMagnet: Record<string, number> };
  visitors: { total: number; bySource: Record<string, number>; daily: { date: string; total: number }[] };
  pipeline: { proposalsOut: number; projectedRevenue: number; closedWon: number; closedRevenue: number; closedLost: number };
  outreach: {
    linkedin: { sent: number; replied: number; booked: number };
    email: { sent: number; opened: number; replied: number; booked: number };
  };
  deals: { id: string; company: string; value: number; status: string; source: string; packageType: string | null }[];
}

function KPI({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-dark tracking-tight">{value}</p>
      {change && <p className="text-xs text-accent mt-1">{change}</p>}
    </div>
  );
}

function BarChart({ items }: { items: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-16 text-right flex-shrink-0">{item.label}</span>
          <div className="flex-1 h-5 bg-gray-100 rounded-md overflow-hidden">
            <div
              className="h-full rounded-md transition-all duration-700"
              style={{ width: `${(item.value / max) * 100}%`, background: item.color, minWidth: "2px" }}
            />
          </div>
          <span className="text-xs font-semibold text-dark w-12">{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    proposal: "bg-blue-50 text-blue-700",
    negotiation: "bg-amber-50 text-amber-700",
    closed_won: "bg-green-50 text-green-700",
    closed_lost: "bg-red-50 text-red-700",
    lead: "bg-gray-50 text-gray-600",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  const totalVisitors = Math.round(data.visitors.total);
  const roas = data.pipeline.closedRevenue > 0 ? (data.pipeline.closedRevenue / 2000).toFixed(1) : "—";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center font-mono font-bold text-xs text-white">N</div>
            <h1 className="text-sm font-semibold text-dark">Neo Analytica Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md">{userEmail}</span>
            <Link href="/" className="text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
              ← Back to site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI label="Website Visitors (30d)" value={totalVisitors.toLocaleString()} />
          <KPI label="Email Subscribers" value={data.subscribers.total.toString()} change={`+${data.subscribers.recent} this month`} />
          <KPI label="Lead Magnet Downloads" value={data.downloads.total.toString()} change={`+${data.downloads.recent} this month`} />
          <KPI label="Pipeline Value" value={`£${(data.pipeline.projectedRevenue / 1000).toFixed(0)}k`} change={`ROAS: ${roas}×`} />
        </div>

        {/* Row 2: Visitors + Subscribers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" /> Website Visitors by Source
            </h3>
            <BarChart
              items={[
                { label: "Organic", value: Math.round(data.visitors.bySource.organic || 0), color: "#0D9668" },
                { label: "Paid", value: Math.round(data.visitors.bySource.paid || 0), color: "#2563EB" },
                { label: "Direct", value: Math.round(data.visitors.bySource.direct || 0), color: "#7C3AED" },
                { label: "Referral", value: Math.round(data.visitors.bySource.referral || 0), color: "#D97706" },
              ]}
            />
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Subscribers by Source
            </h3>
            <BarChart
              items={Object.entries(data.subscribers.bySource).map(([key, val]) => ({
                label: key.charAt(0).toUpperCase() + key.slice(1),
                value: val,
                color: key === "linkedin" ? "#0A66C2" : key === "google" ? "#2563EB" : key === "lead_magnet" ? "#7C3AED" : "#0D9668",
              }))}
            />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">Downloads by Magnet</h4>
              {Object.entries(data.downloads.byMagnet).length > 0 ? (
                <div className="space-y-1">
                  {Object.entries(data.downloads.byMagnet).map(([name, count]) => (
                    <div key={name} className="flex justify-between text-xs">
                      <span className="text-gray-600">{name.replace(/-/g, " ")}</span>
                      <span className="font-semibold text-dark">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No downloads yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Row 3: Outreach + Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" /> Outreach Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-3">LinkedIn</p>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Sent</span><span className="text-sm font-bold">{data.outreach.linkedin.sent}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Replied</span><span className="text-sm font-bold">{data.outreach.linkedin.replied}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Booked</span><span className="text-sm font-bold text-accent">{data.outreach.linkedin.booked}</span></div>
                  <div className="pt-2 border-t border-gray-200 text-center">
                    <span className="text-xs font-semibold text-accent">
                      {data.outreach.linkedin.sent > 0 ? ((data.outreach.linkedin.replied / data.outreach.linkedin.sent) * 100).toFixed(1) : 0}% reply rate
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-3">Cold Email</p>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Sent</span><span className="text-sm font-bold">{data.outreach.email.sent}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Opened</span><span className="text-sm font-bold">{data.outreach.email.opened}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Replied</span><span className="text-sm font-bold">{data.outreach.email.replied}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Booked</span><span className="text-sm font-bold text-accent">{data.outreach.email.booked}</span></div>
                  <div className="pt-2 border-t border-gray-200 text-center">
                    <span className="text-xs font-semibold text-accent">
                      {data.outreach.email.sent > 0 ? ((data.outreach.email.replied / data.outreach.email.sent) * 100).toFixed(1) : 0}% reply rate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" /> Sales Pipeline
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-dark">{data.pipeline.proposalsOut}</p>
                <p className="text-[10px] text-gray-500">Active Proposals</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-dark">£{data.pipeline.projectedRevenue.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Projected Revenue</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-700">{data.pipeline.closedWon}</p>
                <p className="text-[10px] text-green-600">Closed Won</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-700">£{data.pipeline.closedRevenue.toLocaleString()}</p>
                <p className="text-[10px] text-green-600">Won Revenue</p>
              </div>
            </div>
            {/* Funnel */}
            <div className="space-y-1">
              <div className="bg-accent h-6 rounded flex items-center px-2 text-[10px] text-white font-medium" style={{ width: "100%" }}>
                {totalVisitors} visitors
              </div>
              <div className="bg-blue-500 h-6 rounded flex items-center px-2 text-[10px] text-white font-medium" style={{ width: `${Math.max(10, (data.subscribers.total / Math.max(totalVisitors, 1)) * 100)}%` }}>
                {data.subscribers.total} leads
              </div>
              <div className="bg-violet-500 h-6 rounded flex items-center px-2 text-[10px] text-white font-medium" style={{ width: `${Math.max(8, (data.pipeline.proposalsOut / Math.max(totalVisitors, 1)) * 100 * 5)}%` }}>
                {data.pipeline.proposalsOut + data.pipeline.closedWon} consults
              </div>
              <div className="bg-dark h-6 rounded flex items-center px-2 text-[10px] text-white font-medium" style={{ width: "8%" }}>
                {data.pipeline.closedWon} won
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Deal Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-dark">Deal Pipeline</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Company</th>
                  <th className="text-left px-6 py-3 font-medium">Value</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Source</th>
                  <th className="text-left px-6 py-3 font-medium">Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-dark">{deal.company}</td>
                    <td className="px-6 py-3 text-gray-700">£{deal.value.toLocaleString()}</td>
                    <td className="px-6 py-3"><StatusBadge status={deal.status} /></td>
                    <td className="px-6 py-3 text-gray-500 capitalize">{deal.source}</td>
                    <td className="px-6 py-3 text-gray-500 text-xs">{deal.packageType?.replace(/_/g, " ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 pb-4">
          Neo Analytica Internal Dashboard · Data from Prisma/SQLite
        </p>
      </div>
    </div>
  );
}
