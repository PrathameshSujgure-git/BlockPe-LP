import type { Metadata } from "next";
import "./globals.css";
import { Agentation } from "agentation";

// TODO: Uncomment and update once domain is finalized
// const siteUrl = "https://blockpe.com";

const title = "BlockPe — Payment Infrastructure for AI Agents";
const description =
  "Agent-first payment infrastructure enabling autonomous AI agents to transact in INR using on-chain rails. Built for India's agent economy.";

export const metadata: Metadata = {
  // TODO: Uncomment once domain is finalized
  // metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    // TODO: Uncomment once domain is finalized
    // url: siteUrl,
    siteName: "BlockPe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BlockPe — Payment Infrastructure for AI Agents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0a0b0d",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
