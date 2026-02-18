'use client';

import { useReducer } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, ChevronLeft, CalendarX2 } from 'lucide-react';
import { bookings, companies, timeSlots, type Booking } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function MyBookingsPage() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { toast } = useToast();
  const studentId = 'student-1'; // Mock current student

  const myBookings = bookings.filter(b => b.studentId === studentId);

  const handleCancelBooking = (companyId: string, timeSlotId: string) => {
    const bookingIndex = bookings.findIndex(b => b.studentId === studentId && b.companyId === companyId && b.timeSlotId === timeSlotId);
    if (bookingIndex > -1) {
      const companyName = companies.find(c => c.id === companyId)?.name;
      bookings.splice(bookingIndex, 1); // Mutate array
      forceUpdate(); // Trigger re-render
      toast({
        title: 'Prenotazione Cancellata',
        description: `La tua prenotazione con ${companyName} è stata cancellata.`,
      });
    }
  };

  const getBookingDetails = (booking: Booking) => {
      const company = companies.find(c => c.id === booking.companyId);
      const timeSlot = timeSlots.find(t => t.id === booking.timeSlotId);
      return { company, timeSlot };
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
          {myBookings.map((booking, index) => {
            const { company, timeSlot } = getBookingDetails(booking);
            if (!company || !timeSlot) return null;

            return (
              <Card key={index} className="flex flex-col">
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
                        <AlertDialogAction onClick={() => handleCancelBooking(booking.companyId, booking.timeSlotId)}>
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
