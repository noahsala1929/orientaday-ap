'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ShieldCheck, ShieldOff } from 'lucide-react';

// For better security, this should be an environment variable
const ADMIN_PIN = '72943816'; 

export function SiteLockProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const validHostnames = ['orientaday.orientaedu.it', 'localhost'];
    // This check ensures the lock only runs on the intended domain.
    if (typeof window !== 'undefined' && !validHostnames.includes(window.location.hostname)) {
      setIsUnlocked(true);
      setIsClient(true);
      return;
    }

    setIsClient(true);
    try {
      if (sessionStorage.getItem('orientaday-admin-unlocked') === 'true') {
        setIsUnlocked(true);
      }
    } catch (e) {
      console.error("Could not access sessionStorage.", e);
    }
  }, []);

  const handleUnlock = () => {
    if (pin === ADMIN_PIN) {
      try {
        sessionStorage.setItem('orientaday-admin-unlocked', 'true');
        setIsUnlocked(true);
        setError('');
      } catch (e) {
        console.error("Could not access sessionStorage.", e);
        // If sessionStorage is not available, unlock for this session only.
        setIsUnlocked(true);
      }
    } else {
      setError('Invalid code. Please try again.');
      setPin('');
    }
  };
  
  if (!isClient) {
    // Avoids hydration mismatch by not rendering anything different on the server.
    // A loading spinner could be placed here.
    return null;
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Work in Progress</CardTitle>
          <CardDescription>
            The OrientaDay site is almost ready and will be available to the public soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              If you are an administrator, enter the access code to view the site.
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Admin access code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnlock();
                  }
                }}
              />
              <Button onClick={handleUnlock}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Access
              </Button>
            </div>
            {error && (
              <p className="mt-4 text-sm font-medium text-destructive flex items-center justify-center gap-2">
                <ShieldOff className="h-4 w-4" /> {error}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
