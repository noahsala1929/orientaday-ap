import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Printer, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data, in a real app this would be fetched based on the logged-in user
const student = {
  name: 'Alex Doe',
  school: 'Northwood High School',
  id: 'student-1'
};

const bookings = [
  { company: 'Innovate Inc.', time: '9:00 AM - 10:00 AM', companyLogo: 'https://picsum.photos/seed/c1/40/40' },
  { company: 'Health Forward', time: '11:00 AM - 12:00 PM', companyLogo: 'https://picsum.photos/seed/c4/40/40' },
];

function QrCode({ studentId }: { studentId: string }) {
  const qrData = JSON.stringify({ studentId, app: 'OrientaDay' });
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=256x256&bgcolor=ffffff&color=e53e3e&qzone=1`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-inner">
      <Image
        src={qrApiUrl}
        alt="Your QR Code Ticket"
        width={256}
        height={256}
        className="mx-auto"
      />
    </div>
  );
}

export default function TicketPage() {
  return (
    <div className="container mx-auto py-8 px-4">
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/student/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
        </Button>
      <Card className="max-w-lg mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Your OrientaDay Ticket</CardTitle>
          <CardDescription>Present this QR code at company booths for check-in.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <p className="text-xl font-semibold">{student.name}</p>
              <p className="text-muted-foreground">{student.school}</p>
            </div>
            
            <QrCode studentId={student.id} />

            <Separator />
            
            <div className="w-full text-left">
              <h3 className="font-semibold mb-2">Your Booked Sessions:</h3>
              <ul className="space-y-3">
                {bookings.map((booking, index) => (
                  <li key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-3">
                        <Image src={booking.companyLogo} width={40} height={40} alt={booking.company} className="rounded-full border"/>
                        <div>
                            <p className="font-medium">{booking.company}</p>
                            <p className="text-sm text-muted-foreground">{booking.time}</p>
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center gap-4 mt-6">
        <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print Ticket</Button>
        <Button><Download className="mr-2 h-4 w-4" /> Download</Button>
      </div>
    </div>
  );
}
