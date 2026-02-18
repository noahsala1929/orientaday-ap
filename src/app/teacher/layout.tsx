'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from "@/components/header";
import { Loader2 } from 'lucide-react';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTeacherAuth, setIsTeacherAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [schoolName, setSchoolName] = useState("Insegnante");

  useEffect(() => {
    // Do not run auth check on the login page itself
    if (pathname === '/teacher/login') {
      setIsChecking(false);
      return;
    }

    const storedSchoolName = sessionStorage.getItem('schoolName');
    if (storedSchoolName) {
        setSchoolName(storedSchoolName);
        setIsTeacherAuth(true);
    } else {
        router.replace('/teacher/login');
    }
    setIsChecking(false);
  }, [router, pathname]);
  
  // If we are on the login page, just render the content without layout wrappers
  if (pathname === '/teacher/login') {
      return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isTeacherAuth) {
    // This will show a blank screen while redirecting
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        userName={schoolName}
        userEmail="" 
        userRole="Teacher" 
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
