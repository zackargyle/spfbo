import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SPFBO',
  description: 'Browse all the books from all the years of Self-Published Fantasy Blog Off (SPFBO)!',
  openGraph: {
    title: 'SPFBO',
    description: 'Browse all the books from all the years of Self-Published Fantasy Blog Off (SPFBO)!',
    images: [{
      url: 'https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png',
    }],
  },
  twitter: {
    title: 'SPFBO',
    description: 'Browse all the books from all the years of Self-Published Fantasy Blog Off (SPFBO)!',
    images: [{
      url: 'https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png',
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
