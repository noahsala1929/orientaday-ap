'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signInWithCustomToken, updateProfile } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

import { useAuth } from '@/firebase';
import { createCustomToken } from '@/app/sso/actions';
import { useToast } from '@/hooks/use-toast';

function LoadingScreen({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
    );
}

function SSOLogin() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const auth = useAuth();
    const { toast } = useToast();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!auth) {
            // Wait for auth to be initialized
            return;
        }

        if (token) {
          const performSignIn = async () => {
            try {
              const { customToken, displayName } = await createCustomToken(token);
              const userCredential = await signInWithCustomToken(auth, customToken);
              
              if (userCredential.user && displayName) {
                await updateProfile(userCredential.user, {
                    displayName: displayName,
                });
              }
              
              toast({
                title: 'Accesso Riuscito',
                description: 'Sei stato autenticato in modo sicuro.',
              });
              
              // Redirect to student dashboard after successful login
              router.push('/student/dashboard');
            } catch (error) {
              console.error('SSO Login Failed:', error);
              toast({
                variant: 'destructive',
                title: 'Accesso SSO Fallito',
                description: 'Impossibile autenticarti tramite SSO. Riprova.',
              });
              // Redirect back to home on failure
              router.push('/');
            }
          };
    
          performSignIn();
        } else {
            // If there's no token, something is wrong. Redirect to home.
            toast({
                variant: 'destructive',
                title: 'Errore SSO',
                description: 'Nessun token di autenticazione fornito.',
            });
            router.push('/');
        }
    }, [token, auth, router, toast]);

    // Always show a loading screen while processing
    return <LoadingScreen title="Accesso sicuro in corso..." subtitle="Attendi un momento." />;
}


export default function SSOPage() {
    return (
        <Suspense fallback={<LoadingScreen title="Protezione della sessione in corso..." />}>
            <SSOLogin />
        </Suspense>
    )
}
