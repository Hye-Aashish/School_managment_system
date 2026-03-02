"use client";
import React from "react";
import Sidebar from "../common/sidebar";
import Header from "../common/header";
import Footer from "../common/footer";
import { DrawerProvider, useDrawer } from "@/context/DrawerContext";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
     const { isDrawerOpen } = useDrawer();

     return (
          <div className={`w-full layout-wrapper ${isDrawerOpen ? "active" : ""}`}>
               <div className="w-full flex relative">
                    <Sidebar />
                    <div className="body-wrapper dark:bg-darkblack-500 flex-1 overflow-x-hidden">
                         <Header />
                         <main className="w-full xl:px-4 px-4 pb-4 xl:pb-4 MainSec sm:pt-[156px] pt-[100px]">
                              {children}
                         </main>
                    </div>
               </div>
          </div>
     );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <DrawerProvider>
               <LayoutWrapper>{children}</LayoutWrapper>
          </DrawerProvider>
     );
}
