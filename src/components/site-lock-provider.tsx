'use client';

import React, { createContext, useContext, useState } from 'react';
import { SiteLockPage } from './site-lock-page';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const unlockSite = () => {
    setIsUnlocked(true);
    router.refresh();
  };

  return (
    <SiteLockContext.Provider value={{ isUnlocked, unlockSite }}>
      {isUnlocked ? children : <SiteLockPage />}
    </SiteLockContext.Provider>
  );
}
