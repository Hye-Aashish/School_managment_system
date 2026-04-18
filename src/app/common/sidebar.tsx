'use client';
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import { menu } from "@/constants/menu-data";
import Link from "next/link";

export default function Sidebar() {
  const { toggleDrawer, isDrawerOpen } = useDrawer();
  const pathname = usePathname();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMenuActive = (menuItem: any, index: number) => {
    if (menuItem.url && pathname === menuItem.url) return true;
    if (menuItem.submenu) {
      return menuItem.submenu.some((sub: any) => typeof sub !== "string" && pathname === sub.url);
    }
    return false;
  };

  useEffect(() => {
    menu.forEach((item, index) => {
      if (isMenuActive(item, index)) {
        setActiveMenu(index);
        if (item.submenu) {
          const activeSubItem = item.submenu.find((sub: any) => typeof sub !== "string" && pathname === sub.url);
          if (activeSubItem && typeof activeSubItem !== "string") {
            setActiveSubmenu(activeSubItem.url);
          }
        }
      }
    });
  }, [pathname]);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        onClick={toggleDrawer}
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-all duration-500 xl:hidden ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Main Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-[#0f172a] z-50 transition-all duration-300 shadow-[25px_0_50px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border-r border-white/5
        ${isDrawerOpen ? 'w-[280px] translate-x-0' : 'w-0 -translate-x-full lg:w-[88px] lg:translate-x-0'}
      `}>
        {/* Header/Logo Section */}
        <div className="h-[90px] flex items-center px-6 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 rounded-full" />
          <Link href="/admin/dashboard" className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-emerald-400 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 transform transition-transform hover:rotate-12">
              <span className="text-white font-black text-xl">S</span>
            </div>
            {isDrawerOpen && (
              <div className="transition-all duration-300 opacity-100 translate-x-0">
                <h2 className="text-white font-black text-xl tracking-tight leading-none">SCHOOL<span className="text-primary font-medium">SYS</span></h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">School System</p>
              </div>
            )}
          </Link>
          
          {/* Mobile Close Button */}
          {isDrawerOpen && (
            <button 
              onClick={toggleDrawer}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white lg:hidden z-20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto pt-6 pb-32 px-3 custom-scrollbar space-y-1.5 sidebar-animate-items">
          {menu.map((item, idx) => {
            const isActive = activeMenu === idx;
            const hasSubmenu = item.dropdown && item.submenu && item.submenu.length > 0;

            return (
              <div key={idx} className="relative group/parent">
                <button 
                  onClick={() => {
                    if (hasSubmenu) {
                        setActiveMenu(isActive ? null : idx);
                        if (!isDrawerOpen) toggleDrawer();
                    } else if (item.url) {
                        router.push(item.url);
                    }
                  }}
                  className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative
                    ${isActive ? 'bg-white/5 text-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                    ${!isDrawerOpen ? 'xl:justify-center xl:px-0' : ''}
                  `}
                >
                  {/* Active Indicator Glow */}
                  {isActive && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]" />}
                  
                  <span className={`shrink-0 transition-all duration-300 
                    ${isActive ? 'text-primary scale-110' : 'text-gray-400 group-hover:scale-110 group-hover:text-white'}
                  `}>
                    {item.icon}
                  </span>
                  
                  <span className={`text-sm font-black whitespace-nowrap transition-all duration-300 flex-1 text-left
                    ${isDrawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none absolute'}
                    ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}>
                    {item.title}
                  </span>

                  {hasSubmenu && (
                    <svg className={`shrink-0 transition-all duration-300 
                      ${isActive ? 'rotate-180 text-primary' : 'text-gray-600 group-hover:text-white'}
                      ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}
                    `} 
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}

                  {/* Tooltip for Collapsed State */}
                  {!isDrawerOpen && (
                    <div className="absolute left-20 bg-gray-900 text-white text-[10px] font-black px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-x-4 group-hover:translate-x-0 z-50 whitespace-nowrap shadow-2xl border border-white/5 uppercase tracking-widest">
                      {item.title}
                    </div>
                  )}
                </button>

                {/* Submenu with Smooth Accordion */}
                <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${(hasSubmenu && isActive && isDrawerOpen) ? 'max-h-[800px] mt-2 mb-4 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                  <div className="pl-12 pr-4 space-y-1 relative">
                    <div className="absolute left-6 top-0 bottom-4 w-px bg-white/10" />
                    {item.submenu.map((sub: any, subIdx) => {
                      const title = typeof sub === "string" ? sub : sub.title;
                      const url = typeof sub === "string" ? "#" : sub.url;
                      const subActive = activeSubmenu === url;

                      return (
                        <Link 
                          key={subIdx}
                          href={url}
                          className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all duration-200
                            ${subActive ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}
                            relative
                          `}
                        >
                          {subActive && <div className="absolute -left-[24.5px] w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,1)]" />}
                          {title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </aside>
    </>
  );
}