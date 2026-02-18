'use client';

import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { students } from '@/lib/data';

export function QrScannerMock({ onScanSuccess }: { onScanSuccess: (studentId: string) => void }) {
  const handleMockScan = () => {
    // Pick a random student from the list to simulate a scan
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    onScanSuccess(randomStudent.id);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-8 border-2 border-dashed rounded-lg bg-background">
      <div className="p-6 mb-4 rounded-full bg-primary/10">
        <QrCode className="w-12 h-12 text-primary" />
      </div>
      <p className="mb-4 text-center text-muted-foreground">
        Pronto per la scansione dei biglietti studente.
      </p>
      <Button onClick={handleMockScan} size="lg">
        Simula Scansione Studente
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">(Lo scanner è simulato per questa demo)</p>
    </div>
  );
}
