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
                title: 'Login Successful',
                description: 'You have been securely logged in.',
              });
              
              // Redirect to student dashboard after successful login
              router.push('/student/dashboard');
            } catch (error) {
              console.error('SSO Login Failed:', error);
              toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Could not log you in via SSO. Please try again.',
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
                title: 'SSO Error',
                description: 'No authentication token provided.',
            });
            router.push('/');
        }
    }, [token, auth, router, toast]);

    // Always show a loading screen while processing
    return <LoadingScreen title="Logging you in securely..." subtitle="Please wait a moment." />;
}


export default function SSOPage() {
    return (
        <Suspense fallback={<LoadingScreen title="Securing your session..." />}>
            <SSOLogin />
        </Suspense>
    )
}
