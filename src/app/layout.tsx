import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo Analytica — Data Engineering That Ships in Weeks",
  description:
    "Productized data engineering packages on AWS, Azure & GCP. Fixed pricing. No scope creep. Book your free 30-minute consultation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
