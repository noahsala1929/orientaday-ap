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
    setIsClient(true);
    if (document.cookie.includes('site_unlocked=true')) {
      setIsUnlocked(true);
    }
  }, []);

  const unlockSite = () => {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 1 day
    const expires = "expires=" + date.toUTCString();
    document.cookie = "site_unlocked=true;" + expires + ";path=/";
    // Forcing a reload is more robust in production environments
    // to ensure the cookie is read correctly on the next page load.
    window.location.reload();
  };
  
  if (!isClient) {
    // Evita di renderizzare qualsiasi cosa sul server che dipenda dai cookie
    return null;
  }

  return (
    <SiteLockContext.Provider value={{ isUnlocked, unlockSite }}>
      {isUnlocked ? children : <SiteLockPage />}
    </SiteLockContext.Provider>
  );
}
