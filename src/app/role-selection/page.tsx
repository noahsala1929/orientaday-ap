'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, School, User } from 'lucide-react';

const roles = [
  {
    name: 'Studente',
    href: '/student/dashboard',
    icon: <School className="h-12 w-12 text-primary" />,
    description: 'Accedi al tuo pannello per prenotare le sessioni con le aziende.'
  },
  {
    name: 'Azienda',
    href: '/company/login',
    icon: <Building className="h-12 w-12 text-primary" />,
    description: 'Valuta gli studenti e gestisci i talenti incontrati durante l\'evento.'
  },
  {
    name: 'Insegnante',
    href: '/teacher/dashboard',
    icon: <User className="h-12 w-12 text-primary" />,
    description: 'Monitora la presenza dei tuoi studenti e gestisci le attività della scuola.'
  },
]

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Seleziona il tuo ruolo</h1>
        <p className="text-muted-foreground mt-2">Scegli il pannello di controllo a cui vuoi accedere.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} passHref>
            <Card className="text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="items-center">
                {role.icon}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center">
                <CardTitle className="font-headline text-2xl mb-2">{role.name}</CardTitle>
                <p className="text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
