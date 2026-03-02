"use client";
import { createContext, useContext, useState } from "react";
const DrawerContext = createContext<any>(null);
export function DrawerProvider({ children }: { children: React.ReactNode }) {
     const [isDrawerOpen, setIsDrawerOpen] = useState(true);
     const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
     return (
          <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
               {children}
          </DrawerContext.Provider>
     );
}
export function useDrawer() {
     return useContext(DrawerContext);
}
