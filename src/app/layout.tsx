import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo Analytica \u2014 Data Engineering That Ships in Weeks",
  description: "Productized data engineering packages on AWS, Azure & GCP. Fixed pricing. No scope creep.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
