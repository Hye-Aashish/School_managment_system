'use client';
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import { menu } from "@/constants/menu-data";
import "../css/sidebar.css";

export default function Sidebar() {
  const { toggleDrawer } = useDrawer();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Check if a menu item or its submenu is active
  const isMenuActive = (menuItem: any, index: number) => {
    // Check if main URL matches
    if (menuItem.url && pathname === menuItem.url) {
      return true;
    }

    // Check if any submenu item matches
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
      if (isMenuActive(item, index)) {
        setActiveMenu(index);

        // Find active submenu
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

  useEffect(() => {
    const navSelector = document.querySelector(".nav-wrapper");
    if (!navSelector) return;

    const items = navSelector.querySelectorAll(".item");
    const listeners: Array<{ el: Element; fn: EventListener }> = [];

    // Auto-expand active menu on load
    items.forEach((item, index) => {
      const submenu = item.querySelector(".sub-menu");
      if (isMenuActive(menu[index], index) && submenu) {
        submenu.classList.add("active");
      }
    });

    items.forEach((item, index) => {
      const submenu = item.querySelector(".sub-menu");
      const clickTarget = item.querySelector("a");

      if (!clickTarget) return;

      const toggleMenu = (e: any) => {
        e.preventDefault();

        // Close all other submenus
        items.forEach((otherItem, otherIndex) => {
          const otherSubmenu = otherItem.querySelector(".sub-menu");
          if (otherSubmenu && otherIndex !== index) {
            otherSubmenu.classList.remove("active");
          }
        });

        // Toggle current submenu
        if (menu[index]?.dropdown && submenu) {
          submenu.classList.toggle("active");
          setActiveMenu(activeMenu === index ? null : index);
        } else if (menu[index]?.url) {
          window.location.href = menu[index].url;
        }
      };

      clickTarget.addEventListener("click", toggleMenu);
      listeners.push({ el: clickTarget, fn: toggleMenu });
    });

    return () => {
      listeners.forEach(({ el, fn }) => {
        el.removeEventListener("click", fn);
      });
    };
  }, [activeMenu, pathname]);

  return (
    <>


      <aside className="block xl:block sm:hidden sidebar-wrapper w-[304px] fixed top-0 bg-black h-full z-30 shadow-2xl">
        <div className="sidebar-header relative border-b border-white/20 w-full h-[108px] flex items-center pl-5 z-30 bg-gradient-to-r from-black to-gray-900">
          <a href="/" className="transition-transform hover:scale-105">
            <img
              src="/images/logo.webp"
              className="block w-[80%]"
              style={{ filter: 'brightness(100) drop-shadow(0 0 10px rgba(15, 205, 225, 0.3))' }}
              alt="logo"
            />
          </a>
          <button
            type="button"
            onClick={toggleDrawer}
            className="drawer-btn absolute right-0 top-auto"
            title="Ctrl+b"
          >
            <span>
              <svg width="16" height="40" viewBox="0 0 16 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#0fcde1" />
                <path d="M10 15L6 20.0049L10 25.0098" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <div className="sidebar-body pl-4 pt-3.5 w-full relative z-30 h-screen overflow-y-scroll pb-[200px]">
          {/* Gradient overlay at top */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>

          <div className="nav-wrapper pr-5 mb-9">
            <div className="item-wrapper mb-5">
              <ul className="mt-2.5">
                {menu.map((m, idx) => (
                  <li
                    key={idx}
                    className={`item py-[11px] text-white ${isMenuActive(m, idx) ? 'active' : ''}`}
                  >
                    <a href={m.url || "#"} className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2.5 items-center">
                          <span className="item-ico">{m.icon}</span>
                          <span className="item-text text-lg font-medium leading-none">
                            {m.title}
                          </span>
                        </div>
                        {m.dropdown && (
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            <svg
                              width="6"
                              height="12"
                              viewBox="0 0 6 12"
                              fill="none"
                              className="fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                                d="M0.531506 0.414376C0.20806 0.673133 0.155619 1.1451 0.414376 1.46855L4.03956 6.00003L0.414376 10.5315C0.155618 10.855 0.208059 11.3269 0.531506 11.5857C0.854952 11.8444 1.32692 11.792 1.58568 11.4685L5.58568 6.46855C5.80481 6.19464 5.80481 5.80542 5.58568 5.53151L1.58568 0.531506C1.32692 0.20806 0.854953 0.155619 0.531506 0.414376Z"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </a>

                    {m.dropdown && (
                      <ul className="sub-menu mt-[22px] ml-2.5 pl-5 border-l border-[#0FCDE1]/30">
                        {m.submenu?.map((sub, i) => (
                          <li key={i}>
                            <a
                              href={typeof sub === "string" ? "#" : sub.url}
                              className={`text-md font-medium text-gray-400 hover:text-[#0FCDE1] transition-all py-1.5 inline-block ${typeof sub !== "string" && isSubmenuActive(sub.url) ? 'active-submenu' : ''
                                }`}
                            >
                              {typeof sub === "string" ? sub : sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="copy-write-text px-4 py-6 bg-gradient-to-t from-gray-900 to-transparent rounded-lg">
            <p className="text-sm text-gray-500 mb-1">© 2025 All Rights Reserved</p>
            <p className="text-sm text-gray-400 font-medium">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
              <a
                href="https://www.futuretouch.in/"
                target="_blank"
                className="font-semibold text-[#0FCDE1] hover:text-[#0AB5C7] transition-colors border-b border-[#0FCDE1]/50 hover:border-[#0AB5C7]"
              >
                Future IT Touch
              </a>
            </p>
          </div>
        </div>
      </aside>

      <div
        style={{ zIndex: 25 }}
        className="aside-overlay block sm:hidden w-full h-full fixed left-0 top-0 bg-black bg-opacity-40 backdrop-blur-sm"
      ></div>

      <aside className="sm:block hidden relative w-24 bg-black">
        <div className="w-full sidebar-wrapper-collapse relative top-0 z-30">
          <div className="sidebar-header bg-black sticky top-0 border-b border-white/20 w-full h-[108px] flex items-center justify-center z-20">
            <a href="index.html" className="transition-transform hover:scale-110">
              <img
                src="/images/logo.png"
                style={{ filter: 'brightness(100) drop-shadow(0 0 8px rgba(15, 205, 225, 0.4))' }}
                className="block h-10"
                alt="logo"
              />
            </a>
          </div>
          <div className="sidebar-body pt-3.5 w-full">
            <div className="flex flex-col items-center">
              <div className="nav-wrapper mb-9">
                <div className="item-wrapper mb-5">
                  <ul className="mt-2.5 flex justify-center items-center flex-col">
                    {menu.map((m, idx) => (
                      <li key={idx} className="item py-[11px] px-[43px] group">
                        <a
                          href={m.url || "#"}
                          className="transition-all hover:scale-110 inline-block"
                        >
                          <span className="item-ico group-hover:drop-shadow-[0_0_8px_rgba(15,205,225,0.6)]">
                            {m.icon}
                          </span>
                        </a>

                        {m.dropdown && m.submenu && m.submenu.length > 0 && (
                          <ul className="sub-menu border-l border-[#0FCDE1] bg-gray-900 px-5 py-2 rounded-lg shadow-2xl min-w-[200px]">
                            {m.submenu?.map((sub, i) => (
                              <li key={i}>
                                <a
                                  href={typeof sub === "string" ? "#" : sub.url}
                                  className="text-md font-medium text-gray-400 hover:text-[#0FCDE1] transition-all py-1.5 inline-block"
                                >
                                  {typeof sub === "string" ? sub : sub.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}