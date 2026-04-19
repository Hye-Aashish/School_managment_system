'use client';
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/common/sidebar";
import Header from "@/app/common/header";
import { DrawerProvider, useDrawer } from "@/context/DrawerContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen } = useDrawer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  // Calculate dynamic spacing based on sidebar state
  // Using 1024px (lg) as the threshold for desktop layout
  const sidebarWidth = isDrawerOpen ? 280 : 88;
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  
  return (
    <div className={`flex min-h-screen bg-background text-foreground ${isDrawerOpen ? 'sidebar-expanded' : ''}`}>
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Application Area */}
        <div 
            className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative"
            style={{ paddingLeft: 'var(--sidebar-width)' }}
        >
          {/* Top Decorative Glow */}
          <div className="absolute top-[-200px] left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
          
          <Header />

          {/* Dynamic Content Area */}
          <main className="flex-1 mt-[80px] p-[var(--content-padding)] w-full relative z-10">
            <div className="max-w-[1600px] mx-auto animate-fade-in text-foreground">
              {children}
            </div>
          </main>

          {/* Footer Decoration */}
          <footer className="py-6 px-10 text-center opacity-40 relative z-10">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">School Management System v4.0</p>
          </footer>
        </div>

        {/* Mobile/Tablet Overlay */}
        {isDrawerOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden" />
        )}
    </div>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <DrawerProvider>
      <DashboardContent>{children}</DashboardContent>
    </DrawerProvider>
  );
}
