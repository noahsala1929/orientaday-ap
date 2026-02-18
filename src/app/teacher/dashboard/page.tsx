'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { students as initialStudents, type Student } from '@/lib/data';
import { Check, MoreHorizontal, UserX, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const { toast } = useToast();

  const handleSetStatus = (studentId: string, status: 'present' | 'absent') => {
    const studentName = students.find(s => s.id === studentId)?.name;
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
    toast({
      title: 'Presenza Aggiornata',
      description: `${studentName} è stato segnato come ${status === 'present' ? 'presente' : 'assente'}.`,
    });
    if (status === 'absent') {
      // In a real app, this would trigger a server action to release bookings.
      console.log(`Releasing bookings for student ${studentId}`);
    }
  };

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'present':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><UserCheck className="mr-1 h-3 w-3"/>Presente</Badge>;
      case 'absent':
        return <Badge variant="destructive"><UserX className="mr-1 h-3 w-3"/>Assente</Badge>;
      default:
        return <Badge variant="outline">In attesa</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold font-headline tracking-tight mb-2">Presenze Studenti</h1>
      <p className="text-muted-foreground mb-8">Gestisci le presenze degli studenti della tua scuola.</p>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Studente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.email}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Apri menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSetStatus(student.id, 'present')}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Segna come Presente
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSetStatus(student.id, 'absent')}>
                          <UserX className="mr-2 h-4 w-4" />
                          Segna come Assente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
