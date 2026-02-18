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
      <div style={{ display: isUnlocked ? 'block' : 'none' }} className="h-full">{children}</div>
      {!isUnlocked && <SiteLockPage />}
    </SiteLockContext.Provider>
  );
}
