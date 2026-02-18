'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SsoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // This page acts as a bridge. The SSO flow is currently not working
    // due to server-side configuration issues.
    // As per the user's request, we will redirect any traffic
    // from the old site to the standard login page.
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg font-semibold">Reindirizzamento...</p>
      <p className="text-muted-foreground">Stiamo reindirizzando alla pagina di accesso.</p>
    </div>
  );
}
