'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { students, schools, type Student } from '@/lib/data';
import { QrScannerMock } from '@/components/company/qr-scanner-mock';
import { StarRating } from '@/components/company/star-rating';
import { useToast } from '@/hooks/use-toast';
import { Save, User, UserPlus } from 'lucide-react';

interface AssessedStudent extends Student {
  rating: number;
  notes: string;
}

export default function CompanyDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<AssessedStudent | null>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleScanSuccess = (studentId: string) => {
    const studentData = students.find(s => s.id === studentId);
    if (studentData) {
      // Reset fields for new student
      setRating(0);
      setNotes('');
      setSelectedStudent({ ...studentData, rating: 0, notes: '' });
      toast({
        title: 'Studente Trovato',
        description: `${studentData.name} è pronto per il check-in.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Errore Scansione',
        description: 'Studente non trovato nel sistema.',
      });
    }
  };

  const handleSaveAssessment = () => {
    if (!selectedStudent) return;
    
    // Here you would save the data to your backend (e.g., Firestore)
    console.log({
      studentId: selectedStudent.id,
      rating,
      notes,
    });
    
    toast({
      title: 'Valutazione Salvata',
      description: `Note e valutazione per ${selectedStudent.name} sono state salvate.`,
    });
    
    // Clear selection for next scan
    setSelectedStudent(null);
  };
  
  const getSchoolName = (schoolId: string) => {
    return schools.find(s => s.id === schoolId)?.name || 'Scuola Sconosciuta';
  }

  return (
    <div className="container mx-auto py-8 px-4 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Check-In Studenti</CardTitle>
            <CardDescription>Usa lo scanner per fare il check-in degli studenti per la loro sessione.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <QrScannerMock onScanSuccess={handleScanSuccess} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Valutazione Talento</CardTitle>
            <CardDescription>
              {selectedStudent ? `In valutazione: ${selectedStudent.name}` : 'Scansiona il biglietto di uno studente per iniziare.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedStudent ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-bold">{selectedStudent.name}</p>
                    <p className="text-muted-foreground">{getSchoolName(selectedStudent.schoolId)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Valutazione Talento</label>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>

                <div>
                  <label htmlFor="notes" className="text-sm font-medium">Note</label>
                  <Textarea
                    id="notes"
                    placeholder="Aggiungi note sull'interazione, competenze, ruoli potenziali, ecc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                </div>

                <Button onClick={handleSaveAssessment} className="w-full" size="lg">
                  <Save className="mr-2 h-4 w-4" /> Salva Valutazione
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg h-full bg-background">
                <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-semibold">Nessuno Studente Selezionato</p>
                <p className="text-sm text-muted-foreground">Scansiona il biglietto QR di uno studente per caricare qui il suo profilo.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
