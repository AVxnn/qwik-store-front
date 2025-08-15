import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qwik Store | Telegram",
  description: "Создай свой магазин в Telegram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}
