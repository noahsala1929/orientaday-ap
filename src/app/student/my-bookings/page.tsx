'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, ChevronLeft, CalendarX2, Loader2 } from 'lucide-react';
import { companies, timeSlots, type Booking } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export default function MyBookingsPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !user) return;
    
    setIsLoading(true);
    const q = query(collection(firestore, 'bookings'), where('studentId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsFromDb = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Booking));
      setMyBookings(bookingsFromDb);
      setIsLoading(false);
    }, (error) => {
        console.error("Error fetching bookings: ", error);
        setIsLoading(false);
        toast({
            variant: 'destructive',
            title: 'Errore nel caricamento',
            description: 'Impossibile caricare le tue prenotazioni.'
        })
    });

    return () => unsubscribe();
  }, [firestore, user, toast]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'bookings', bookingId));
      toast({
        title: 'Prenotazione Cancellata',
        description: `La tua prenotazione è stata cancellata.`,
      });
    } catch (error) {
        console.error("Error cancelling booking: ", error);
        toast({
            variant: 'destructive',
            title: 'Errore',
            description: 'Impossibile cancellare la prenotazione. Riprova.',
        });
    }
  };

  const getBookingDetails = (booking: Booking) => {
      const company = companies.find(c => c.id === booking.companyId);
      const timeSlot = timeSlots.find(t => t.id === booking.timeSlotId);
      return { company, timeSlot };
  }

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-[50vh]">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/student/dashboard">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Torna alla Dashboard
        </Link>
      </Button>

      <h1 className="text-3xl font-bold font-headline tracking-tight mb-2">Le Mie Prenotazioni</h1>
      <p className="text-muted-foreground mb-8">Qui puoi vedere e gestire le sessioni che hai prenotato.</p>

      {myBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBookings.map((booking) => {
            const { company, timeSlot } = getBookingDetails(booking);
            if (!company || !timeSlot) return null;

            return (
              <Card key={booking.id} className="flex flex-col">
                <CardHeader className="flex-row items-start gap-4">
                    <Image
                        data-ai-hint={company.logo.imageHint}
                        src={company.logo.imageUrl}
                        alt={`${company.name} logo`}
                        width={64}
                        height={64}
                        className="rounded-lg border"
                    />
                    <div>
                        <CardTitle className="font-headline text-xl">{company.name}</CardTitle>
                        <CardDescription className="mt-1">{timeSlot.label}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Disdici
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Questa azione è irreversibile. La tua prenotazione con {company.name} per la fascia oraria {timeSlot.label} sarà cancellata.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annulla</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleCancelBooking(booking.id)}>
                          Conferma Cancellazione
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent className="flex flex-col items-center justify-center text-center p-12">
             <CalendarX2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">Nessuna Prenotazione</h2>
            <p className="text-muted-foreground mt-2">Non hai ancora prenotato nessuna sessione. Torna alla dashboard per iniziare.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
