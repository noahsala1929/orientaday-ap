'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email("Per favore inserisci un'email valida."),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast({ 
        title: 'Email Inviata', 
        description: 'Controlla la tua casella di posta per le istruzioni di reset.',
      });
      setTimeout(() => router.push('/login'), 3000);
    } catch (error: any) {
      console.error('Password Reset Failed:', error);
      if (error.code === 'auth/unauthorized-domain') {
        toast({
          variant: 'destructive',
          title: 'Dominio Non Autorizzato',
          description: "Questo sito non è configurato per l'accesso. Contatta l'amministratore.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invio Fallito",
          description: "Impossibile inviare l'email. Controlla che l'indirizzo sia corretto.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Recupera Password" description="Inserisci la tua email per ricevere le istruzioni di reset.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="mario.rossi@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Invio in corso...' : 'Invia Email di Recupero'}
          </Button>
        </form>
      </Form>
       <p className="mt-6 text-center text-sm text-muted-foreground">
        Tornare alla pagina di{' '}
        <Link href="/login" passHref>
          <span className="font-semibold text-primary hover:underline cursor-pointer">Login</span>
        </Link>
      </p>
    </AuthLayout>
  );
}
