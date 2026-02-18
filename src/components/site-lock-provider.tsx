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
    // This now runs only on the client.
    setIsClient(true);
    try {
      // Check if the user has already unlocked the site in this session.
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
        // If PIN is correct, save the unlocked state in sessionStorage.
        sessionStorage.setItem('orientaday-admin-unlocked', 'true');
        setIsUnlocked(true);
        setError('');
      } catch (e) {
        console.error("Could not access sessionStorage.", e);
        // If sessionStorage is not available, unlock for this session only.
        setIsUnlocked(true);
      }
    } else {
      setError('Codice non valido. Riprova.');
      setPin('');
    }
  };
  
  if (!isClient) {
    // Render nothing on the server to avoid hydration mismatches.
    return null;
  }

  if (isUnlocked) {
    // If unlocked, show the actual app content.
    return <>{children}</>;
  }

  // If not unlocked, show the PIN entry screen.
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Lavori in Corso</CardTitle>
          <CardDescription>
            Il sito OrientaDay è quasi pronto e sarà presto disponibile al pubblico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Se sei un amministratore, inserisci il codice di accesso per visualizzare il sito.
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Codice di accesso admin"
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
                Accedi
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
