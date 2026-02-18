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
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  schoolName: z.string().min(3, "Il nome della scuola è obbligatorio."),
  pin: z.string().length(4, "Il PIN deve essere di 4 cifre."),
});

const TEACHER_PIN = "1929";

export default function TeacherLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { schoolName: '', pin: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    if (values.pin === TEACHER_PIN) {
      sessionStorage.setItem('schoolName', values.schoolName);
      toast({
        title: 'Accesso Riuscito',
        description: `Benvenuto/a nell'area della scuola ${values.schoolName}.`,
      });
      router.push('/teacher/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Accesso Fallito",
        description: "PIN non corretto. Riprova.",
      });
      form.setValue('pin', '');
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Accesso Area Insegnanti" description="Inserisci la tua scuola e il PIN per continuare.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scuola</FormLabel>
                <FormControl>
                    <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Nome della tua scuola" 
                            {...field} 
                            className="pl-10"
                        />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN</FormLabel>
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
