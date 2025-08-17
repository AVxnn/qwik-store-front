"use client"

import DashboardHeader from "@/components/DashboardHeader";
import NavBar from "@/components/NavBar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className='w-full relative max-w-[1440px] mx-auto flex'>
        <NavBar />
        <main className='w-full p-8 pt-0'>
          <DashboardHeader />
          <div className='max-w-7xl mx-auto'>
          {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
