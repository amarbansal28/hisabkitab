"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./navigation/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Navigation />
          <div className="w-4/5 min-h-screen p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
