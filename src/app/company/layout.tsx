'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from "@/components/header";
import { Loader2 } from 'lucide-react';
import { companies } from '@/lib/data';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCompanyAuth, setIsCompanyAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [companyName, setCompanyName] = useState("Azienda");

  useEffect(() => {
    // Do not run auth check on the login page itself
    if (pathname === '/company/login') {
      setIsChecking(false);
      return;
    }

    const companyId = sessionStorage.getItem('companyId');
    if (companyId) {
        const company = companies.find(c => c.id === companyId);
        setCompanyName(company?.name || "Azienda");
        setIsCompanyAuth(true);
    } else {
        router.replace('/company/login');
    }
    setIsChecking(false);
  }, [router, pathname]);

  // If we are on the login page, just render the content without layout wrappers
  if (pathname === '/company/login') {
      return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isCompanyAuth) {
    // This will show a blank screen while redirecting
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={companyName}
        userEmail="" 
        userRole="Company HR" 
      />
      <main className="flex-1 bg-muted/20">{children}</main>
    </div>
  );
}
