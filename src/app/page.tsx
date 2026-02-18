import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="flex max-w-2xl flex-col items-center gap-y-8 text-center">
          <Logo />
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Benvenuti a OrientaDay
            </h1>
            <p className="text-lg text-muted-foreground">
              La piattaforma per connettere studenti, scuole e aziende. Accedi per
              scoprire le opportunità e gestire la tua giornata.
            </p>
          </div>
          <Link href="/role-selection">
            <Button size="lg">
              <span>Accedi</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} OrientaDay. All rights reserved.</p>
      </footer>
    </div>
  );
}
