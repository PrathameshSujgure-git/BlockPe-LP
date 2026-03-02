import type { Metadata } from "next";
import "./globals.css";
import { Agentation } from "agentation";

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
      <body suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
