import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { CoinProvider } from "@/contexts/CoinContext";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "無料タロット占い | ヒカリノ – 恋愛・仕事・金運を本格鑑定",
  description:
    "当たると評判のタロット占いで、恋愛・仕事・金運の未来を無料診断。カードが運命を本格鑑定します。",
  icons: {
    icon: "/tarot-card.svg",
    apple: "/tarot-card.svg",
  },
  openGraph: {
    images: ["/hikarino-thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={inter.className + " bg-white"}>
        <CoinProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CoinProvider>
      </body>
    </html>
  );
}
