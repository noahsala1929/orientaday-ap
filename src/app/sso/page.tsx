'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signInWithCustomToken, updateProfile } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { createCustomToken } from './actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SSOProcessor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token && auth) {
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
          
          router.push('/student/dashboard');
        } catch (error) {
          console.error('SSO Login Failed:', error);
          toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'Could not log you in via SSO. Please try again.',
          });
          router.push('/');
        }
      };

      performSignIn();
    } else if (!token) {
        router.push('/');
    }
  }, [searchParams, router, auth, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-xl font-semibold">Logging you in securely...</h1>
      <p className="text-muted-foreground">Please wait a moment.</p>
    </div>
  );
}


export default function SSOPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SSOProcessor />
        </Suspense>
    )
}
