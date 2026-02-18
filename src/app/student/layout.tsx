'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/header";
import { useUser } from '@/firebase/auth/use-user';
import { Loader2 } from 'lucide-react';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={user.displayName || "Alex Doe"} 
        userEmail={user.email || "alex.doe@example.com"} 
        userRole="Student" 
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
