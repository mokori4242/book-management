import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Management App",
  description: "A simple book management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-[#f0ebe5] p-4 border-b border-gray-200">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Book Management</Link>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:underline">ホーム</Link></li>
                <li><Link href="/books" className="hover:underline">書籍一覧</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
