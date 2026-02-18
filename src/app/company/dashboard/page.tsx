'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { companies, timeSlots, type Booking } from '@/lib/data';
import { StarRating } from '@/components/company/star-rating';
import { useToast } from '@/hooks/use-toast';
import { Save, UserPlus, MoreHorizontal, Pencil, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFirestore } from '@/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';


interface AssessedStudent {
  id: string; // studentId
  name: string;
}

export default function CompanyDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<AssessedStudent | null>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [companyId, setCompanyId] = useState<string | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();

  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCompanyId = sessionStorage.getItem('companyId');
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    } else {
        // Redirect or show error if no companyId
    }
  }, []);

  useEffect(() => {
    if (!firestore || !companyId) return;

    setIsLoading(true);
    const q = query(collection(firestore, 'bookings'), where('companyId', '==', companyId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsFromDb = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Booking));
      setAllBookings(bookingsFromDb);
      setIsLoading(false);
    }, (error) => {
        console.error("Error fetching bookings: ", error);
        setIsLoading(false);
        toast({
            variant: 'destructive',
            title: 'Errore nel caricamento',
            description: 'Impossibile caricare le prenotazioni.'
        })
    });

    return () => unsubscribe();
  }, [firestore, companyId, toast]);

  const handleSelectStudentForAssessment = (student: {id: string, name: string}) => {
    setRating(0);
    setNotes('');
    setSelectedStudent({ id: student.id, name: student.name });
    toast({
      title: 'Studente Selezionato',
      description: `${student.name} è pronto per la valutazione.`,
    });
  };

  const handleSaveAssessment = async () => {
    if (!selectedStudent || !firestore || !companyId) return;
    
    try {
        await addDoc(collection(firestore, 'assessments'), {
            studentId: selectedStudent.id,
            studentName: selectedStudent.name,
            companyId: companyId,
            rating,
            notes,
            createdAt: serverTimestamp(),
        });

        toast({
            title: 'Valutazione Salvata',
            description: `Note e valutazione per ${selectedStudent.name} sono state salvate.`,
        });
        
        setSelectedStudent(null);
    } catch (error) {
        console.error("Error saving assessment: ", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Qualcosa è andato storto.",
            description: "Impossibile salvare la valutazione.",
        });
    }
  };
  
  const getBookedStudentsForSlot = (slotId: string) => {
    return allBookings.filter(b => b.timeSlotId === slotId);
  };

  const companyName = companies.find(c => c.id === companyId)?.name || 'Azienda';

  return (
    <div className="container mx-auto py-8 px-4 h-full">
      <h1 className="text-3xl font-bold font-headline tracking-tight mb-2">Dashboard di {companyName}</h1>
      <p className="text-muted-foreground mb-8">Visualizza gli studenti prenotati e valuta i talenti.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Studenti Prenotati</CardTitle>
            <CardDescription>Visualizza gli studenti iscritti per ogni fascia oraria.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isLoading ? (
                 <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : (
                <Tabs defaultValue={timeSlots[0].id} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    {timeSlots.map(slot => (
                    <TabsTrigger key={slot.id} value={slot.id}>{slot.label}</TabsTrigger>
                    ))}
                </TabsList>
                {timeSlots.map(slot => {
                    const bookedStudents = getBookedStudentsForSlot(slot.id);
                    return (
                    <TabsContent key={slot.id} value={slot.id} className="mt-4">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nome Studente</TableHead>
                            <TableHead className="text-right">Azioni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookedStudents.length > 0 ? (
                            bookedStudents.map(studentBooking => (
                                <TableRow key={studentBooking.id}>
                                <TableCell className="font-medium">{studentBooking.studentName}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Apri menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleSelectStudentForAssessment({id: studentBooking.studentId, name: studentBooking.studentName})}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Valuta Talento
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                </TableRow>
                            ))
                            ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="h-24 text-center">
                                Nessuno studente prenotato per questa fascia oraria.
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TabsContent>
                    );
                })}
                </Tabs>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Valutazione Talento</CardTitle>
            <CardDescription>
              {selectedStudent ? `In valutazione: ${selectedStudent.name}` : 'Seleziona uno studente dalla lista per iniziare.'}
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
                <p className="text-sm text-muted-foreground">Seleziona "Valuta Talento" dalla lista a sinistra per iniziare.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
