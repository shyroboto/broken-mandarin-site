import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "brokenmandarin",
  description: "New music coming soon.",
  openGraph: {
    title: "brokenmandarin",
    description: "New music coming soon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
