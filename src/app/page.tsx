'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building, School, UserCheck } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function HomePage() {
  const roles = [
    {
      title: "Per Studenti",
      description: "Scopri le aziende, prenota le tue sessioni e ottieni il tuo biglietto QR personalizzato per l'evento.",
      icon: <School className="w-8 h-8 text-primary" />,
      link: "/login/student",
      cta: "Accesso Studente",
    },
    {
      title: "Per Insegnanti",
      description: "Accedi alla tua dashboard per gestire le presenze degli studenti e monitorare la partecipazione all'evento.",
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      link: "/login/teacher",
      cta: "Dashboard Insegnante",
    },
    {
      title: "Per Aziende",
      description: "Fai il check-in degli studenti, valuta i talenti e gestisci il tuo programma. Ottimizzato per tablet.",
      icon: <Building className="w-8 h-8 text-primary" />,
      link: "/login/company",
      cta: "Portale Azienda",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <Logo size="lg" />
        <h1 className="mt-6 text-4xl font-bold tracking-tighter font-headline md:text-5xl lg:text-6xl">
          Scopri istituzioni scolastiche e aziende d'eccellenza del tessuto bolognese
        </h1>
        <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
          Scegli il tuo ruolo per cominciare.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-8 w-full max-w-5xl">
        {roles.map((role) => (
          <Card key={role.title} className="flex flex-col transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-2xl">
            <CardHeader className="items-center pt-8">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                {role.icon}
              </div>
              <CardTitle className="font-headline">{role.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow text-center">
              <CardDescription className="flex-grow px-2">{role.description}</CardDescription>
              <Button asChild className="mt-6 w-full group">
                <Link href={role.link}>
                  {role.cta}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 OrientaDay. All rights reserved.</p>
      </footer>
    </main>
  );
}
