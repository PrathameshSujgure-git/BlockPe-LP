import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlockPe - 0xGasless",
  description: "0xGasless Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
