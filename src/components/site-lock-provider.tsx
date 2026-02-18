'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ShieldCheck, ShieldOff } from 'lucide-react';

const ADMIN_PIN = '72943816'; // Per maggiore sicurezza, questo dovrebbe essere in una variabile d'ambiente

export function SiteLockProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      if (sessionStorage.getItem('orientaday-admin-unlocked') === 'true') {
        setIsUnlocked(true);
      }
    } catch (e) {
      console.error("Impossibile accedere a sessionStorage.", e);
    }
  }, []);

  const handleUnlock = () => {
    if (pin === ADMIN_PIN) {
      try {
        sessionStorage.setItem('orientaday-admin-unlocked', 'true');
        setIsUnlocked(true);
        setError('');
      } catch (e) {
        console.error("Impossibile accedere a sessionStorage.", e);
        // Se sessionStorage non è disponibile, sblocca solo per questa sessione.
        setIsUnlocked(true);
      }
    } else {
      setError('Codice non valido. Riprova.');
      setPin('');
    }
  };
  
  if (!isClient) {
    // Evita il mismatch di idratazione non renderizzando nulla di diverso sul server.
    // Qui si potrebbe inserire uno spinner di caricamento.
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
          <CardTitle className="font-headline text-2xl">Lavori in Corso</CardTitle>
          <CardDescription>
            Il sito di OrientaDay è quasi pronto e sarà presto disponibile al pubblico.
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
                placeholder="Codice di accesso Admin"
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
