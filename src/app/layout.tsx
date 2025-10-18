import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GlobalNavbar } from "@/components/global-navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tempo - Modern SaaS Starter",
  description: "A modern full-stack starter template powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        <GlobalNavbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
