'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function HomePage() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-background">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <Logo size="lg" />
        <h1 className="mt-6 text-4xl font-bold tracking-tighter font-headline md:text-5xl lg:text-6xl">
          Benvenuti a OrientaDay
        </h1>
        <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
          La piattaforma per connettere studenti, scuole e aziende.
          Accedi per scoprire le opportunità e gestire la tua giornata.
        </p>
         <Button asChild className="mt-10 group" size="lg">
            <Link href="/login">
              Accedi
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
      </div>
      <footer className="py-8 mt-auto text-center text-muted-foreground text-sm">
        <p>&copy; 2024 OrientaDay. All rights reserved.</p>
      </footer>
    </main>
  );
}
