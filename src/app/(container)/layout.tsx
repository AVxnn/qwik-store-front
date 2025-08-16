"use client"

import { NotificationProvider } from "@/hooks/useNotifications";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider maxNotifications={3}>
      {children}
    </NotificationProvider>
  );
}
