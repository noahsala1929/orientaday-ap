'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithCustomToken, updateProfile } from 'firebase/auth';
import { ArrowRight, Building, School, UserCheck, Loader2 } from 'lucide-react';

import { useAuth } from '@/firebase';
import { createCustomToken } from '@/app/sso/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

function LoadingScreen({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
    );
}

function SSOLogic() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const auth = useAuth();
    const { toast } = useToast();
    const token = searchParams.get('token');

    useEffect(() => {
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
        }
    }, [token, auth, router, toast]);

    if (token) {
        return <LoadingScreen title="Logging you in securely..." subtitle="Please wait a moment." />;
    }

    return <HomePageContent />;
}

function HomePageContent() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
      setIsClient(true)
  }, []);

  const roles = [
    {
      title: "For Students",
      description: "Discover companies, book your sessions, and get your personalized QR ticket for the event.",
      icon: <School className="w-8 h-8 text-primary" />,
      link: "/login/student",
      cta: "Student Access",
    },
    {
      title: "For Teachers",
      description: "Access your dashboard to manage student attendance and monitor event participation.",
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      link: "/login/teacher",
      cta: "Teacher Dashboard",
    },
    {
      title: "For Companies",
      description: "Check-in students, assess talent, and manage your schedule. Optimized for tablets.",
      icon: <Building className="w-8 h-8 text-primary" />,
      link: "/login/company",
      cta: "Company Portal",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <Logo size="lg" />
        <h1 className="mt-6 text-4xl font-bold tracking-tighter font-headline md:text-5xl lg:text-6xl">
          The Future of Career Fairs
        </h1>
        <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
          OrientaDay seamlessly connects students with their future careers. Choose your role to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-8 w-full max-w-5xl">
        {roles.map((role) => (
          <Card key={role.title} className="flex flex-col transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                {role.icon}
              </div>
              <CardTitle className="font-headline">{role.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow text-center">
              <CardDescription className="flex-grow">{role.description}</CardDescription>
              <Button asChild className="mt-6 w-full group">
                <Link href={role.link}>
                  {role.cta}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm">
        {isClient ? <p>&copy; {new Date().getFullYear()} OrientaDay. All rights reserved.</p> : <p>&copy; OrientaDay. All rights reserved.</p> }
      </footer>
    </main>
  );
}

export default function Home() {
    return (
        <Suspense fallback={<LoadingScreen title="Loading..." />}>
            <SSOLogic />
        </Suspense>
    )
}
