'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Header } from "@/components/header";
import { Loader2 } from 'lucide-react';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isCompanyAuth, setIsCompanyAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace('/login');
      return;
    }

    if (!userLoading && user) {
        // Allow access to the company login page itself
        if (pathname === '/company/login') {
            setIsCompanyAuth(true);
            setIsChecking(false);
            return;
        }

        const companyId = sessionStorage.getItem('companyId');
        if (!companyId) {
            router.replace('/company/login');
        } else {
            setIsCompanyAuth(true);
            setIsChecking(false);
        }
    }
  }, [user, userLoading, router, pathname]);

  if (userLoading || isChecking || !isCompanyAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const handleSwitchCompany = () => {
    sessionStorage.removeItem('companyId');
    router.push('/company/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={user?.displayName || "Azienda"} 
        userEmail={user?.email || ""} 
        userRole="Company HR" 
      />
      <main className="flex-1 bg-muted/20">{children}</main>
    </div>
  );
}
