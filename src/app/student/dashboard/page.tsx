'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { companies, timeSlots, type Booking } from '@/lib/data';
import { CheckCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function StudentDashboard() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [isBooking, setIsBooking] = useState<string | null>(null);

  useEffect(() => {
    if (!firestore || !user) return;

    // Listener for my bookings
    const myBookingsQuery = query(collection(firestore, 'bookings'), where('studentId', '==', user.uid));
    const unsubscribeMyBookings = onSnapshot(myBookingsQuery, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setMyBookings(bookings);
    });

    // Listener for all bookings
    const allBookingsQuery = query(collection(firestore, 'bookings'));
    const unsubscribeAllBookings = onSnapshot(allBookingsQuery, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setAllBookings(bookings);
    });

    return () => {
      unsubscribeMyBookings();
      unsubscribeAllBookings();
    };
  }, [firestore, user]);

  const handleBooking = async (companyId: string, timeSlotId: string) => {
    if (!user || !firestore) return;

    const bookingId = `${companyId}-${timeSlotId}`;
    setIsBooking(bookingId);

    const hasBookingInSlot = myBookings.some(b => b.timeSlotId === timeSlotId);
    if (hasBookingInSlot) {
      toast({
        variant: 'destructive',
        title: 'Limite di Prenotazioni Raggiunto',
        description: 'Puoi prenotare solo un\'azienda per fascia oraria.',
      });
      setIsBooking(null);
      return;
    }

    try {
      await addDoc(collection(firestore, 'bookings'), {
        studentId: user.uid,
        studentName: user.displayName || user.email || 'Studente Anonimo',
        companyId,
        timeSlotId,
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Prenotazione Confermata!',
        description: `Hai prenotato con successo con ${companies.find(c => c.id === companyId)?.name}.`,
      });
    } catch (error) {
      console.error("Error booking session: ", error);
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: 'Impossibile completare la prenotazione. Riprova.',
      });
    } finally {
      setIsBooking(null);
    }
  };

  const hasBooking = (companyId: string, timeSlotId: string) => {
    return myBookings.some(b => b.companyId === companyId && b.timeSlotId === timeSlotId);
  };
  
  const hasBookingInSlot = (timeSlotId: string) => {
    return myBookings.some(b => b.timeSlotId === timeSlotId);
  }

  const getBookingsCountForSlot = (companyId: string, timeSlotId: string) => {
      return allBookings.filter(b => b.timeSlotId === timeSlotId && b.companyId === companyId).length;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Sessioni Aziendali</h1>
            <p className="text-muted-foreground mt-1">Sfoglia e prenota sessioni con le aziende.</p>
        </div>
      </div>

      <Tabs defaultValue={timeSlots[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-full">
          {timeSlots.map(slot => (
            <TabsTrigger key={slot.id} value={slot.id} className="rounded-full data-[state=active]:shadow-lg">{slot.label}</TabsTrigger>
          ))}
        </TabsList>
        {timeSlots.map(slot => (
          <TabsContent key={slot.id} value={slot.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {companies.map(company => {
                const isBookedByMe = hasBooking(company.id, slot.id);
                const slotIsBookedByMe = hasBookingInSlot(slot.id);

                const bookingsCount = getBookingsCountForSlot(company.id, slot.id);
                const isFull = bookingsCount >= slot.capacity;
                const progressValue = (bookingsCount / slot.capacity) * 100;
                const currentBookingId = `${company.id}-${slot.id}`;

                return (
                  <Card key={company.id} className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl rounded-2xl">
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
                        <CardDescription className="mt-1 line-clamp-3 text-sm">{company.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-4 flex flex-col justify-end">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>Posti prenotati</span>
                            </div>
                            <span>{bookingsCount} / {slot.capacity}</span>
                        </div>
                        <Progress value={progressValue} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handleBooking(company.id, slot.id)}
                        disabled={isBooking !== null || isBookedByMe || (slotIsBookedByMe && !isBookedByMe) || isFull}
                      >
                        {isBooking === currentBookingId ? 'Prenotazione in corso...' : isBookedByMe ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Prenotato
                          </>
                        ) : (
                          isFull ? 'Slot Esaurito' : 'Prenota Sessione'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
