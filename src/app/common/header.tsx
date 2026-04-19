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

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
        try {
            const res = await fetch("/api/notices");
            const data = await res.json();
            if (data.success) setNotices(data.data);
        } catch (error) {
            console.error("Notice fetch error:", error);
        }
    };
    fetchNotices();
  }, []);

  const sidebarWidth = isDrawerOpen ? 280 : 88;

  const displayNotices = notices.length > 0 ? notices : [
    { title: "System Update 4.0", message: "New security patches applied successfully.", created_at: new Date().toISOString() },
    { title: "Admission Open", message: "New session admissions are now live.", created_at: new Date().toISOString() }
  ];

  if (!mounted) return <div className="h-[80px]" />;

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
        <div className="flex items-center gap-3 md:gap-4 relative">
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
            <div className="relative">
                <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-darkblack-600 shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-darkblack-500 transition-all text-gray-600 dark:text-gray-300"
                >
                    <FontAwesomeIcon icon={faBell} />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-darkblack-600 animate-pulse" />
                </button>

                {/* Modern Notification Dropdown */}
                {isNotifOpen && (
                    <div className="absolute top-[120%] right-0 w-80 md:w-96 bg-white dark:bg-[#0f172a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[32px] border border-gray-100 dark:border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-300 origin-top-right">
                        <div className="p-6 border-b dark:border-white/5 flex items-center justify-between">
                            <h3 className="font-black text-sm uppercase tracking-widest text-bgray-900 dark:text-white">Alerts Center</h3>
                            <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-0.5 rounded-lg">{displayNotices.length} NEW</span>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                            {displayNotices.map((notif: any, i: number) => (
                                <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer group">
                                    <h4 className="font-black text-xs text-bgray-900 dark:text-white group-hover:text-primary transition-colors">{notif.title}</h4>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                                    <div className="flex items-center gap-2 mt-3 opacity-60">
                                        <FontAwesomeIcon icon={faClock} className="text-[9px]" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">{new Date(notif.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-white/5 text-center">
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Mark all as read</button>
                        </div>
                    </div>
                )}
            </div>

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
                
                {/* Quick Logout Header Action */}
                <button 
                    onClick={async () => { 
                        await fetch("/api/auth/logout", { method: "POST" });
                        window.location.replace("/"); 
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all ml-2"
                    title="Quick Logout"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </header>
  );
}