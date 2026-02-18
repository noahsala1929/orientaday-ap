'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteLockPage } from './site-lock-page';

interface SiteLockContextType {
  isUnlocked: boolean;
  unlockSite: () => void;
}

const SiteLockContext = createContext<SiteLockContextType | undefined>(undefined);

export function useSiteLock() {
  const context = useContext(SiteLockContext);
  if (context === undefined) {
    throw new Error('useSiteLock must be used within a SiteLockProvider');
  }
  return context;
}

export function SiteLockProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsClient(true);
  }, []);

  const unlockSite = () => {
    setIsUnlocked(true);
  };

  return (
    <SiteLockContext.Provider value={{ isUnlocked, unlockSite }}>
      {children}
      {isClient && !isUnlocked && (
        <div className="fixed inset-0 z-50 h-full w-full bg-background">
          <SiteLockPage />
        </div>
      )}
    </SiteLockContext.Provider>
  );
}
