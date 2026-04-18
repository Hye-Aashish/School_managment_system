'use client';
import React, { useEffect, useState } from "react";
import { useDrawer } from "@/context/DrawerContext";
import { useLayout } from "@/context/LayoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClock, faBars, faSearch, faMoon, faSun, faExpand, faGraduationCap, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { toggleDrawer, isDrawerOpen } = useDrawer();
  const { theme, toggleTheme } = useLayout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    
    handleScroll();
    handleResize();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mounted) return null;

  const sidebarWidth = isDrawerOpen ? 280 : 88;

  return (
    <header 
      className={`fixed top-0 right-0 z-30 transition-all duration-300 h-[80px] px-6
        ${isScrolled ? 'glass' : 'bg-transparent'}
      `}
      style={{ left: 'var(--sidebar-width)' }}
    >
      <div className="h-full max-w-[1600px] mx-auto flex items-center justify-between gap-6">
        
        {/* Left Side: Dynamic Info */}
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleDrawer}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-darkblack-600 shadow-sm hover:bg-primary hover:text-white transition-all outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-lg" />
          </button>

          <div className="hidden md:block">
            <h1 className="text-xl font-black text-bgray-900 dark:text-white flex items-center gap-2">
              <span className="text-primary"><FontAwesomeIcon icon={faGraduationCap} /></span>
              Dashboard Admin
            </h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Academic Progress & Metrics</p>
          </div>
        </div>

        {/* Center: Search Pro */}
        <div className="hidden lg:flex flex-1 max-w-md">
            <div className="w-full relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-primary transition-colors">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search students, staff or fees..."
                    className="w-full bg-white dark:bg-darkblack-600 border border-gray-100 dark:border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all placeholder:text-gray-400"
                />
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <span className="text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-white/10 px-1.5 py-0.5 rounded-md">⌘K</span>
                </div>
            </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-4">
            {/* Theme Toggle Button */}
            <button 
                onClick={toggleTheme}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-darkblack-600 shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-darkblack-500 transition-all text-gray-600 dark:text-gray-300"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
                <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className={theme === 'dark' ? 'text-yellow-400' : 'text-blue-500'} />
            </button>

            {/* Quick Stats Toggle (Visual Only) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success-100 dark:bg-success-400/10 rounded-full border border-success-200 dark:border-success-400/20">
                <div className="w-2 h-2 rounded-full bg-success-600 animate-pulse" />
                <span className="text-[10px] font-black text-success-800 dark:text-success-400 uppercase tracking-tighter">System Live</span>
            </div>

            {/* Notification & Notification Glow */}
            <button className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-darkblack-600 shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-darkblack-500 transition-all text-gray-600 dark:text-gray-300">
                <FontAwesomeIcon icon={faBell} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-darkblack-600" />
            </button>

            {/* User Profile */}
            <div className="pl-4 border-l border-gray-100 dark:border-white/10 flex items-center gap-4 group cursor-pointer">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-bgray-900 dark:text-white leading-tight">Amit Sharam</p>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Chief Administrator</p>
                </div>
                <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 p-0.5 shadow-lg shadow-primary/20">
                        <div className="w-full h-full rounded-[10px] bg-white dark:bg-darkblack-600 overflow-hidden flex items-center justify-center font-black text-primary text-sm">
                            AS
                        </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success-500 border-4 border-white dark:border-darkblack-600" />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}