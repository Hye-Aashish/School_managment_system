'use client';
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import { MoreHorizontal } from "lucide-react";
import { menu } from "@/constants/menu-data";
import "@/app/css/horizontal-navbar.css";

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