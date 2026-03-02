// context/LayoutContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutMode = 'vertical' | 'horizontal';

interface LayoutContextType {
  layoutMode: LayoutMode;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical');

  // Load layout mode from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem('layoutMode') as LayoutMode;
    if (savedLayout) {
      setLayoutMode(savedLayout);
    }
  }, []);

  const toggleLayout = () => {
    setLayoutMode((prev) => {
      const newMode = prev === 'vertical' ? 'horizontal' : 'vertical';
      localStorage.setItem('layoutMode', newMode);
      return newMode;
    });
  };

  return (
    <LayoutContext.Provider value={{ layoutMode, toggleLayout }}>
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