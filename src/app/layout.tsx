import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import { SiteLockProvider } from '@/components/site-lock-provider';

export const metadata: Metadata = {
  title: 'OrientaDay',
  description: 'Streamlining career fair connections for students, teachers, and companies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <FirebaseClientProvider>
          <SiteLockProvider>
            {children}
          </SiteLockProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
