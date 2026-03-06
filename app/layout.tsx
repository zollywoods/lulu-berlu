import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lulu Berlu",
  description: "Lulu Berlu is a curatorial project by Maya Blumenberg-Taylor and Alyssa Mattocks, located across two spaces in Ridgewood, NY",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
