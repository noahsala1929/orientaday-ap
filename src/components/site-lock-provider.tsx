'use client';

import React, { createContext, useContext, useState } from 'react';
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

  const unlockSite = () => {
    setIsUnlocked(true);
  };

  return (
    <SiteLockContext.Provider value={{ isUnlocked, unlockSite }}>
      {children}
      {!isUnlocked && (
        <div className="fixed inset-0 z-50 h-full w-full bg-background">
          <SiteLockPage />
        </div>
      )}
    </SiteLockContext.Provider>
  );
}
