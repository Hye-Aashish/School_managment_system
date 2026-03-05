'use client';
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import { MoreHorizontal } from "lucide-react";
import { menu } from "@/constants/menu-data";

export default function HorizontalNavbar() {
     const pathname = usePathname();
     const [activeMenu, setActiveMenu] = useState<number | null>(null);
     const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [openDropdown, setOpenDropdown] = useState<number | null>(null);
     const [showMoreMenu, setShowMoreMenu] = useState(false);

     // Number of menu items to show before "More"
     const VISIBLE_MENU_COUNT = 5;

     // Check if a menu item or its submenu is active
     const isMenuActive = (menuItem: any) => {
          if (menuItem.url && pathname === menuItem.url) {
               return true;
          }
          if (menuItem.submenu && menuItem.submenu.length > 0) {
               return menuItem.submenu.some((sub: any) =>
                    typeof sub !== "string" && pathname === sub.url
               );
          }
          return false;
     };

     // Check if a submenu item is active
     const isSubmenuActive = (url: string) => {
          return pathname === url;
     };

     // Set active menu on mount and pathname change
     useEffect(() => {
          menu.forEach((item, index) => {
               if (isMenuActive(item)) {
                    setActiveMenu(index);
                    if (item.submenu) {
                         const activeSubItem = item.submenu.find((sub: any) =>
                              typeof sub !== "string" && pathname === sub.url
                         );
                         if (activeSubItem && typeof activeSubItem !== "string") {
                              setActiveSubmenu(activeSubItem.url);
                         }
                    }
               }
          });
     }, [pathname]);

     // Split menu into visible and hidden items
     const visibleMenuItems = menu.slice(0, VISIBLE_MENU_COUNT);
     const hiddenMenuItems = menu.slice(VISIBLE_MENU_COUNT);

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (e: MouseEvent) => {
               const target = e.target as HTMLElement;
               if (!target.closest('.nav-item') && !target.closest('.more-menu-container')) {
                    setOpenDropdown(null);
                    setShowMoreMenu(false);
               }
          };

          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
     }, []);

     return (
          <>
               <style jsx>{`
        .horizontal-navbar {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-bottom: 2px solid rgba(15, 205, 225, 0.2);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
        }

        .nav-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        
        .nav-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 205, 225, 0.1);
          border-radius: 10px;
        }
        
        .nav-scrollbar::-webkit-scrollbar-thumb {
          background: #0FCDE1;
          border-radius: 10px;
        }
        
        .nav-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0AB5C7;
        }

        .nav-item {
          position: relative;
        }

        .nav-item > a {
          transition: all 0.3s ease;
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          color: #374151;
        }

        .nav-item > a:hover {
          background: rgba(15, 205, 225, 0.1);
          transform: translateY(-2px);
        }

        .nav-item.active > a {
          background: rgba(15, 205, 225, 0.15);
          border-bottom: 3px solid #0FCDE1;
        }

        .nav-item.active .nav-text {
          color: #0FCDE1;
          font-weight: 600;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 250px;
          max-height: 0;
          overflow: hidden;
          background: white;
          border: 1px solid rgba(15, 205, 225, 0.2);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 100;
          margin-top: 8px;
        }

        .dropdown-menu.open {
          max-height: 600px;
          opacity: 1;
        }

        .dropdown-menu.mega-menu {
          min-width: 600px;
          max-width: 800px;
        }

        .dropdown-menu.mega-menu .submenu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 16px;
        }

        .dropdown-menu li {
          list-style: none;
        }

        .dropdown-menu a {
          display: block;
          padding: 10px 20px;
          color: #6B7280;
          transition: all 0.3s ease;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }

        .dropdown-menu a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 0;
          background: #0FCDE1;
          transition: height 0.3s ease;
        }

        .dropdown-menu a:hover {
          color: #0FCDE1;
          background: rgba(15, 205, 225, 0.1);
          padding-left: 24px;
        }

        .dropdown-menu a:hover::before {
          height: 100%;
        }

        .dropdown-menu a.active-submenu {
          color: #0FCDE1;
          font-weight: 600;
          background: rgba(15, 205, 225, 0.15);
          padding-left: 24px;
        }

        .dropdown-menu a.active-submenu::before {
          height: 100%;
        }

        .more-menu-container {
          position: relative;
        }

        .more-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          min-width: 280px;
          max-height: 0;
          overflow: hidden;
          background: white;
          border: 1px solid rgba(15, 205, 225, 0.2);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          opacity: 0;
          z-index: 100;
          margin-top: 8px;
        }

        .more-dropdown.open {
          max-height: 600px;
          opacity: 1;
          overflow-y: auto;
        }

        .more-dropdown .more-menu-item {
          border-bottom: 1px solid #f3f4f6;
          padding: 12px 20px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .more-dropdown .more-menu-item:last-child {
          border-bottom: none;
        }

        .more-dropdown .more-menu-item:hover {
          background: rgba(15, 205, 225, 0.05);
        }

        .more-dropdown .more-menu-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #374151;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .more-dropdown .more-submenu-list {
          padding-left: 35px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .more-dropdown .more-submenu-list a {
          color: #6B7280;
          font-size: 14px;
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: block;
        }

        .more-dropdown .more-submenu-list a:hover {
          color: #0FCDE1;
          background: rgba(15, 205, 225, 0.1);
          padding-left: 16px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-menu.open li {
          animation: slideDown 0.3s ease forwards;
        }

        .dropdown-menu.open li:nth-child(1) { animation-delay: 0.05s; }
        .dropdown-menu.open li:nth-child(2) { animation-delay: 0.1s; }
        .dropdown-menu.open li:nth-child(3) { animation-delay: 0.15s; }
        .dropdown-menu.open li:nth-child(4) { animation-delay: 0.2s; }
        .dropdown-menu.open li:nth-child(5) { animation-delay: 0.25s; }

        .mobile-menu {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          background: white;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .chevron-icon {
          transition: transform 0.3s ease;
        }

        .nav-item:hover .chevron-icon {
          transform: rotate(180deg);
        }

        .more-btn {
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #374151;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 500;
        }

        .more-btn:hover {
          background: rgba(15, 205, 225, 0.1);
          transform: translateY(-2px);
        }

        .more-btn.active {
          background: rgba(15, 205, 225, 0.15);
          color: #0FCDE1;
        }

        @media (max-width: 1024px) {
          .nav-scrollbar {
            overflow-x: auto;
            overflow-y: hidden;
          }
        }
      `}</style>
               {/* Desktop Horizontal Navbar */}
               <nav className="horizontal-navbar hidden lg:block relative z-50">
                    <div className="flex items-center justify-between px-6 h-20">
                         {/* Logo */}
                         <div className="shrink-0">
                              <a href="/" className="transition-transform hover:scale-105 inline-block">
                                   <img
                                        src="/images/logo.webp"
                                        className="h-12"
                                        style={{ filter: 'drop-shadow(0 2px 8px rgba(15, 205, 225, 0.3))' }}
                                        alt="logo"
                                   />
                              </a>
                         </div>
                         {/* Navigation Menu */}
                         <div className="flex-1 ml-8">
                              <ul className="flex items-center justify-end gap-2">
                                   {/* Visible Menu Items */}
                                   {visibleMenuItems.map((item, idx) => (
                                        <li
                                             key={idx}
                                             className={`nav-item ${isMenuActive(item) ? 'active' : ''}`}
                                             onMouseEnter={() => item.dropdown && setOpenDropdown(idx)}
                                             onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                                        >
                                             <a href={item.url || "#"} className="group">
                                                  <span className="item-ico group-hover:scale-110 transition-transform">
                                                       {item.icon}
                                                  </span>
                                                  <span className="nav-text text-sm font-medium">
                                                       {item.title}
                                                  </span>
                                                  {item.dropdown && (
                                                       <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            className="chevron-icon"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                       >
                                                            <path
                                                                 d="M2.5 4.5L6 8L9.5 4.5"
                                                                 stroke="currentColor"
                                                                 strokeWidth="1.5"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            />
                                                       </svg>
                                                  )}
                                             </a>

                                             {/* Dropdown Menu */}
                                             {item.dropdown && (
                                                  <div className={`dropdown-menu ${item.submenu && item.submenu.length > 6 ? 'mega-menu' : ''} ${openDropdown === idx ? 'open' : ''}`}>
                                                       {item.submenu && item.submenu.length > 6 ? (
                                                            <div className="submenu-grid">
                                                                 {item.submenu.map((sub, i) => (

                                                                      <a key={i}
                                                                           href={typeof sub === "string" ? "#" : sub.url}
                                                                           className={`${typeof sub !== "string" && isSubmenuActive(sub.url)
                                                                                ? 'active-submenu'
                                                                                : ''
                                                                                }`}
                                                                      >
                                                                           {typeof sub === "string" ? sub : sub.title}
                                                                      </a>
                                                                 ))}
                                                            </div>
                                                       ) : (
                                                            <ul className="py-2">
                                                                 {item.submenu?.map((sub, i) => (
                                                                      <li key={i}>

                                                                           <a href={typeof sub === "string" ? "#" : sub.url}
                                                                                className={`${typeof sub !== "string" && isSubmenuActive(sub.url)
                                                                                     ? 'active-submenu'
                                                                                     : ''
                                                                                     }`}
                                                                           >
                                                                                {typeof sub === "string" ? sub : sub.title}
                                                                           </a>
                                                                      </li>
                                                                 ))}
                                                            </ul>
                                                       )}
                                                  </div>
                                             )}
                                        </li>
                                   ))}

                                   {/* More Menu Button */}
                                   {hiddenMenuItems.length > 0 && (
                                        <li className="more-menu-container">
                                             <button
                                                  className={`more-btn ${showMoreMenu ? 'active' : ''}`}
                                                  onClick={(e) => {
                                                       e.stopPropagation();
                                                       setShowMoreMenu(!showMoreMenu);
                                                       setOpenDropdown(null);
                                                  }}
                                             >
                                                  <MoreHorizontal size={20} className="text-[#0FCDE1]" />
                                                  <span>More</span>
                                                  <svg
                                                       width="12"
                                                       height="12"
                                                       viewBox="0 0 12 12"
                                                       fill="none"
                                                       className={`transition-transform ${showMoreMenu ? 'rotate-180' : ''}`}
                                                       xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                       <path
                                                            d="M2.5 4.5L6 8L9.5 4.5"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                             </button>

                                             {/* More Dropdown */}
                                             <div className={`more-dropdown ${showMoreMenu ? 'open' : ''}`}>
                                                  {hiddenMenuItems.map((item, idx) => (
                                                       <div key={idx} className="more-menu-item">
                                                            <div className="more-menu-title">
                                                                 {item.icon}
                                                                 <span>{item.title}</span>
                                                            </div>
                                                            {item.dropdown && (
                                                                 <div className="more-submenu-list">
                                                                      {item.submenu?.map((sub, i) => (
                                                                           <a
                                                                                key={i}
                                                                                href={typeof sub === "string" ? "#" : sub.url}
                                                                                className={`${typeof sub !== "string" && isSubmenuActive(sub.url) ? 'text-[#0FCDE1] font-semibold' : ''}`}
                                                                           >
                                                                                {typeof sub === "string" ? sub : sub.title}
                                                                           </a>
                                                                      ))}
                                                                 </div>
                                                            )}
                                                       </div>
                                                  ))}
                                             </div>
                                        </li>
                                   )}
                              </ul>
                         </div>
                    </div>
               </nav>
          </>
     );
}