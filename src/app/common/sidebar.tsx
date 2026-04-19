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
      {/* Mobile Overlay with Ultra Blur */}
      <div 
        onClick={toggleDrawer}
        className={`fixed inset-0 bg-black/40 backdrop-blur-xl z-40 transition-all duration-700 lg:hidden ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Main Sidebar - Sleek Ultra Dark Design */}
      <aside className={`fixed top-0 left-0 h-full bg-[#020617] z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border-r border-white-[0.03]
        ${isDrawerOpen ? 'w-[280px] translate-x-0' : 'w-0 -translate-x-full lg:w-[100px] lg:translate-x-0'}
      `}>
        {/* Subtle Geometric Background Glows */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/10 to-transparent opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-emerald-500/5 to-transparent opacity-20 pointer-events-none" />

        {/* Header/Logo Section - Modern & Clean */}
        <div className="h-[100px] flex items-center px-8 shrink-0 relative overflow-hidden">
          <Link href="/admin/dashboard" className="flex items-center gap-5 relative z-10 group">
            <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.3)] transform transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                <span className="text-[#020617] font-black text-2xl tracking-tighter">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#020617] scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            {isDrawerOpen && (
              <div className="transition-all duration-500 opacity-100 translate-x-0">
                <h2 className="text-white font-black text-2xl tracking-tighter leading-none">SCHOOL<span className="text-primary">SYS</span></h2>
                <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Institutional Hub</p>
                </div>
              </div>
            )}
          </Link>
          
          {/* Mobile Close Button - Minimalist */}
          {isDrawerOpen && (
            <button 
              onClick={toggleDrawer}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-500 hover:text-white lg:hidden z-20 transition-all hover:bg-white/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Navigation Section - Floating Capsule Style */}
        <div className="flex-1 overflow-y-auto pt-8 pb-32 px-4 custom-scrollbar space-y-2 sidebar-animate-items relative z-10">
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
                  className={`w-full flex items-center gap-5 p-4 rounded-[22px] transition-all duration-500 group relative overflow-hidden
                    ${isActive ? 'bg-primary shadow-[0_20px_40px_rgba(16,185,129,0.15)]' : 'text-gray-500 hover:bg-white/[0.03]'}
                    ${!isDrawerOpen ? 'lg:justify-center lg:px-0' : ''}
                  `}
                >
                  {/* Subtle Shimmer Effect on Active */}
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
                  
                  <span className={`shrink-0 transition-all duration-500 
                    ${isActive ? 'text-[#020617] scale-110 drop-shadow-md' : 'text-gray-500 group-hover:scale-110 group-hover:text-primary'}
                  `}>
                    {item.icon}
                  </span>
                  
                  <span className={`text-[13.5px] font-black whitespace-nowrap transition-all duration-500 flex-1 text-left tracking-tight
                    ${isDrawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none absolute'}
                    ${isActive ? 'text-[#020617]' : 'text-gray-400 group-hover:text-white'}
                  `}>
                    {item.title}
                  </span>

                  {hasSubmenu && (
                    <svg className={`shrink-0 transition-all duration-500 
                      ${isActive ? 'rotate-180 text-[#020617]' : 'text-gray-700 group-hover:text-primary'}
                      ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}
                    `} 
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}

                  {/* Enhanced Tooltip for Collapsed State */}
                  {!isDrawerOpen && (
                    <div className="fixed left-[110px] bg-white text-[#020617] text-[10px] font-black px-4 py-2.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible translate-x-4 group-hover:translate-x-0 z-[100] whitespace-nowrap shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 uppercase tracking-[0.2em]">
                      {item.title}
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 rounded-sm" />
                    </div>
                  )}
                </button>

                {/* Submenu with Connected Motion Path */}
                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${(hasSubmenu && isActive && isDrawerOpen) ? 'max-h-[1000px] mt-3 mb-6 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                  <div className="pl-[58px] pr-4 space-y-1.5 relative">
                    <div className="absolute left-[30px] top-0 bottom-6 w-[1.5px] bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
                    {item.submenu.map((sub: any, subIdx) => {
                      const title = typeof sub === "string" ? sub : sub.title;
                      const url = typeof sub === "string" ? "#" : sub.url;
                      const subActive = activeSubmenu === url;

                      return (
                        <Link 
                          key={subIdx}
                          href={url}
                          className={`flex items-center gap-4 py-3 px-4 rounded-2xl text-[13px] font-black tracking-tight transition-all duration-300 relative group/sub
                            ${subActive ? 'text-primary bg-primary/5 shadow-inner' : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'}
                          `}
                        >
                          {/* Submenu Indicator Dot */}
                          <div className={`absolute left-[-31.5px] w-2 h-2 rounded-full border-2 border-[#020617] z-10 transition-all duration-500
                            ${subActive ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-gray-700 group-hover/sub:bg-primary group-hover/sub:scale-110'}
                          `} />
                          
                          <span className="relative z-10">{title}</span>
                          {subActive && <div className="absolute right-4 w-1 h-1 rounded-full bg-primary" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer/Pro Branding Section */}
        {isDrawerOpen && (
            <div className="p-6 mt-auto relative z-10">
                <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-5 border border-primary/20 group cursor-pointer transition-all hover:bg-primary/20 overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-all duration-500" />
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1.5">Version 4.0</p>
                    <p className="text-white font-black text-xs leading-tight">Institutional Enterprise <br/>Network Active</p>
                </div>
            </div>
        )}

      </aside>
    </>
  );
}