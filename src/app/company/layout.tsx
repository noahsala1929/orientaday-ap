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
  const [isCompanyAuth, setIsCompanyAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [companyName, setCompanyName] = useState("Azienda");

  useEffect(() => {
    const companyId = sessionStorage.getItem('companyId');
    if (!companyId) {
        router.replace('/company/login');
    } else {
        const company = companies.find(c => c.id === companyId);
        setCompanyName(company?.name || "Azienda");
        setIsCompanyAuth(true);
        setIsChecking(false);
    }
  }, [router]);

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
