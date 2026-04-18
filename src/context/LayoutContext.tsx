// context/LayoutContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutMode = 'vertical' | 'horizontal';
type ThemeMode = 'light' | 'dark';

interface LayoutContextType {
  layoutMode: LayoutMode;
  theme: ThemeMode;
  toggleLayout: () => void;
  toggleTheme: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical');
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Initial load from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('layoutMode') as LayoutMode;
    if (savedLayout) setLayoutMode(savedLayout);

    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Default to system preference if no saved theme
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleLayout = () => {
    setLayoutMode((prev) => {
      const newMode = prev === 'vertical' ? 'horizontal' : 'vertical';
      localStorage.setItem('layoutMode', newMode);
      return newMode;
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  return (
    <LayoutContext.Provider value={{ layoutMode, theme, toggleLayout, toggleTheme }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}