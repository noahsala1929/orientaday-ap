'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { companies, timeSlots, bookings as initialBookings, type Booking } from '@/lib/data';
import { CheckCircle, Clock, Users, ArrowRight, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function StudentDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const { toast } = useToast();
  const router = useRouter();
  const studentId = 'student-1'; // Mock current student

  const handleBooking = (companyId: string, timeSlotId: string) => {
    // Check if student has already booked in this time slot
    const hasBookingInSlot = bookings.some(b => b.studentId === studentId && b.timeSlotId === timeSlotId);
    if (hasBookingInSlot) {
      toast({
        variant: 'destructive',
        title: 'Limite di Prenotazioni Raggiunto',
        description: 'Puoi prenotare solo un\'azienda per fascia oraria.',
      });
      return;
    }

    const newBooking = { studentId, companyId, timeSlotId };
    setBookings(prev => [...prev, newBooking]);
    toast({
      title: 'Prenotazione Confermata!',
      description: `Hai prenotato con successo con ${companies.find(c => c.id === companyId)?.name}.`,
    });
  };

  const hasBooking = (companyId: string, timeSlotId: string) => {
    return bookings.some(b => b.studentId === studentId && b.companyId === companyId && b.timeSlotId === timeSlotId);
  };
  
  const hasBookingInSlot = (timeSlotId: string) => {
    return bookings.some(b => b.studentId === studentId && b.timeSlotId === timeSlotId);
  }

  const getBookingsForSlot = (timeSlotId: string) => {
    return bookings.filter(b => b.timeSlotId === timeSlotId).length;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Sessioni Aziendali</h1>
            <p className="text-muted-foreground mt-1">Sfoglia e prenota sessioni con le aziende.</p>
        </div>
        <Button onClick={() => router.push('/student/ticket')} className="mt-4 md:mt-0 group">
            <Ticket className="mr-2 h-4 w-4"/>
            Visualizza il Mio Biglietto
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <Tabs defaultValue={timeSlots[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {timeSlots.map(slot => (
            <TabsTrigger key={slot.id} value={slot.id}>{slot.label}</TabsTrigger>
          ))}
        </TabsList>
        {timeSlots.map(slot => (
          <TabsContent key={slot.id} value={slot.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {companies.map(company => {
                const isBooked = hasBooking(company.id, slot.id);
                const slotIsBookedByStudent = hasBookingInSlot(slot.id);
                const bookingsCount = getBookingsForSlot(slot.id);
                const isFull = bookingsCount >= slot.capacity;

                return (
                  <Card key={company.id} className="flex flex-col">
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
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{getBookingsForSlot(slot.id)} / {slot.capacity} prenotati</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{company.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handleBooking(company.id, slot.id)}
                        disabled={isBooked || (slotIsBookedByStudent && !isBooked) || isFull}
                      >
                        {isBooked ? (
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
