'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { School, KeyRound, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { schools } from '@/lib/data';

const formSchema = z.object({
  schoolId: z.string().min(1, "È obbligatorio selezionare una scuola."),
  pin: z.string().length(4, "Il PIN deve essere di 4 cifre."),
});

export default function TeacherLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { schoolId: '', pin: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const school = schools.find(c => c.id === values.schoolId);

    if (school && school.pin === values.pin) {
      sessionStorage.setItem('schoolId', school.id);
      toast({
        title: 'Accesso Riuscito',
        description: `Benvenuto/a nell'area di ${school.name}.`,
      });
      router.push('/teacher/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Accesso Fallito",
        description: "Scuola o PIN non corretti. Riprova.",
      });
      form.setValue('pin', '');
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Accesso Area Insegnanti" description="Seleziona la tua scuola e inserisci il PIN per continuare.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="schoolId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scuola</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                       <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <SelectValue placeholder="Seleziona la tua scuola" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {schools.map(school => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Scuola</FormLabel>
                 <FormControl>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="password" 
                            placeholder="••••" 
                            {...field} 
                            className="pl-10 text-center tracking-[1em]"
                            maxLength={4}
                            autoComplete="new-password"
                        />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
             {isLoading ? 'Verifica in corso...' : (
                <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Accedi
                </>
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
