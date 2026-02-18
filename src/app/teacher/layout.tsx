'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from "@/components/header";
import { Loader2 } from 'lucide-react';
import { schools } from '@/lib/data';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isTeacherAuth, setIsTeacherAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [schoolName, setSchoolName] = useState("Insegnante");

  useEffect(() => {
    const schoolId = sessionStorage.getItem('schoolId');
    if (!schoolId) {
        router.replace('/teacher/login');
    } else {
        const school = schools.find(s => s.id === schoolId);
        setSchoolName(school?.name || "Insegnante");
        setIsTeacherAuth(true);
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
