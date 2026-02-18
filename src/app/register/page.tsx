'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, 'Il nome è troppo corto.'),
  email: z.string().email("Per favore inserisci un'email valida."),
  password: z.string().min(6, 'La password deve contenere almeno 6 caratteri.'),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: values.name });
      }
      
      toast({ title: 'Registrazione Completata', description: 'Reindirizzamento alla dashboard...' });
      router.push('/student/dashboard');
    } catch (error: any) {
      let description = "Si è verificato un errore durante la registrazione.";
      if (error.code === 'auth/email-already-in-use') {
        description = "Questa email è già stata utilizzata. Prova ad accedere.";
      }
      toast({
        variant: "destructive",
        title: "Registrazione Fallita",
        description,
      });
      console.error('Registration Failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Crea un Account" description="Inserisci i tuoi dati per registrarti a Orienta">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Mario Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creazione account...' : 'Registrati'}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Hai già un account?{' '}
        <Link href="/login" passHref>
          <span className="font-semibold text-primary hover:underline cursor-pointer">Accedi</span>
        </Link>
      </p>
    </AuthLayout>
  );
}
