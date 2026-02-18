'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';

const formSchema = z.object({
  email: z.string().email('Per favore inserisci un indirizzo email valido.'),
  password: z.string().min(8, 'La password deve contenere almeno 8 caratteri.'),
});

export default function CompanyLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
    try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
            title: 'Accesso Riuscito',
            description: 'Reindirizzamento al portale aziendale...',
        });
        router.push('/company/dashboard');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Accesso Fallito",
            description: "Email o password non validi. Riprova.",
        });
        console.error('Company Login Failed:', error);
    }
  }

  return (
    <AuthLayout
      title="Portale Azienda"
      description="Accedi per gestire i check-in e valutare i talenti."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hr@azienda.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
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
