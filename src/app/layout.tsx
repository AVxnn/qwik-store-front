import type { Metadata } from "next";
import { Fira_Sans, Fira_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { AuthInitializer } from "@/components/AuthInitializer";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const firaSansCondensed = Fira_Sans_Condensed({
  variable: "--font-fira-sans-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Qwik Store | Telegram",
  description: "Создай свой магазин в Telegram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaSans.variable} ${firaSansCondensed.variable} antialiased`}
      >
        <AuthInitializer>
          {children}
        </AuthInitializer>
      </body>
    </html>
  );
}
