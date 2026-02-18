'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInAnonymously } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';

const formSchema = z.object({
  pin: z.string().min(6, 'Il PIN Master deve contenere almeno 6 caratteri.'),
});

export default function TeacherLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
        // This is a mock login. In a real app, you'd verify the PIN against a backend service.
        await signInAnonymously(auth);
        
        toast({
          title: 'Accesso Riuscito',
          description: 'Reindirizzamento alla dashboard insegnante...',
        });
        router.push('/teacher/dashboard');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Accesso Fallito",
            description: "Impossibile effettuare l'accesso. Riprova.",
        });
        console.error("Teacher Login Failed:", error);
    }
  }

  return (
    <AuthLayout
      title="Dashboard Insegnante"
      description="Inserisci il PIN master per gestire le presenze degli studenti."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Master</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
             {form.formState.isSubmitting ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
