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
  pin: z.string().length(4, 'Il PIN deve essere di 4 cifre.'),
});

export default function CompanyLoginPage() {
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
            description: "Riprova tra qualche istante.",
        });
        return;
    }

    if (values.pin !== '1929') {
        toast({
            variant: "destructive",
            title: "Accesso Fallito",
            description: "PIN non valido. Riprova.",
        });
        return;
    }

    try {
        await signInAnonymously(auth);
        toast({
            title: 'Accesso Riuscito',
            description: 'Reindirizzamento al portale aziendale...',
        });
        router.push('/company/dashboard');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Accesso Fallito",
            description: "Impossibile effettuare l'accesso. Riprova.",
        });
        console.error('Company Login Failed:', error);
    }
  }

  return (
    <AuthLayout
      title="Portale Azienda"
      description="Inserisci il PIN per gestire i check-in e valutare i talenti."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Azienda</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="****" {...field} />
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
