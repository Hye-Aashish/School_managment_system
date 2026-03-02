// components/BodyClassHandler.tsx
'use client';
import { useEffect } from 'react';
import { useLayout } from '@/context/LayoutContext';

export default function BodyClassHandler() {
  const { layoutMode } = useLayout();

  useEffect(() => {
    // Remove both classes first
    document.body.classList.remove('layout-vertical', 'layout-horizontal');
    
    // Add the current layout class
    if (layoutMode === 'horizontal') {
      document.body.classList.add('layout-horizontal');
    } else {
      document.body.classList.add('layout-vertical');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('layout-vertical', 'layout-horizontal');
    };
  }, [layoutMode]);

  return null; // This component doesn't render anything
}