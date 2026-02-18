'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInAnonymously } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { schools } from '@/lib/data';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';

const formSchema = z.object({
  schoolId: z.string().min(1, 'Per favore seleziona la tua scuola.'),
  pin: z.string().length(4, 'Il PIN deve essere di 4 cifre.'),
});

export default function StudentLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolId: '',
      pin: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) {
        toast({
            variant: "destructive",
            title: "Servizio di autenticazione non pronto",
        });
        return;
    }
    try {
        // This is a mock login. In a real app, you'd verify the PIN against a backend service
        // and get a custom token to sign in. For this demo, we sign in anonymously.
        await signInAnonymously(auth);

        toast({
          title: 'Accesso Riuscito',
          description: 'Reindirizzamento alla tua dashboard...',
        });
        // Simulate successful login and redirect
        router.push('/student/dashboard');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Accesso Fallito",
            description: "Impossibile effettuare l'accesso. Riprova.",
        });
        console.error("Student Login Failed:", error);
    }
  }

  return (
    <AuthLayout
      title="Accesso Studente"
      description="Seleziona la tua scuola e inserisci il PIN per continuare."
    >
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
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona la tua scuola" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {schools.map((school) => (
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
                <FormLabel>PIN Studente</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Accesso in corso...' : 'Accedi alla Dashboard'}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
