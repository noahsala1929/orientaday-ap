'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Construction } from 'lucide-react';
import Link from 'next/link';

export default function TicketPage() {
  return (
    <div className="container mx-auto py-8 px-4">
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/student/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Torna alla Dashboard
            </Link>
        </Button>
      <Card className="max-w-lg mx-auto mt-4">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Funzionalità in Arrivo</CardTitle>
          <CardDescription>La generazione del biglietto QR sarà disponibile a breve.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center p-12">
           <Construction className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mt-2">Stiamo finalizzando questa sezione. Torna a trovarci presto!</p>
        </CardContent>
      </Card>
    </div>
  );
}
