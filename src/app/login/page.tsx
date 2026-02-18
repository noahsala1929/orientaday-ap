'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Mail, Lock, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email("Per favore inserisci un'email valida."),
  password: z.string().min(1, 'La password è richiesta.'),
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.06,4.71c1.27-3.958,4.962-6.901,9.634-6.901c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238c-2.008,1.623-4.509,2.625-7.219,2.625c-4.672,0-8.58-3.034-9.963-7.15l-6.06,4.71C9.656,39.663,16.318,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.018,35.258,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const { user, loading: userLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (!userLoading && user) {
      router.push('/role-selection');
    }
  }, [user, userLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSuccessfulLogin = (user: any) => {
    toast({ title: 'Accesso Riuscito', description: 'Reindirizzamento alla selezione del ruolo...' });
    router.push('/role-selection');
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      handleSuccessfulLogin(userCredential.user);
    } catch (error: any) {
      console.error('Login Failed:', error);
      if (error.code === 'auth/unauthorized-domain') {
        toast({
          variant: "destructive",
          title: "Dominio Non Autorizzato",
          description: "L'accesso da questo sito non è abilitato. Contatta l'amministratore.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Accesso Fallito",
          description: "Email o password non corretti. Riprova.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!auth) return;
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      handleSuccessfulLogin(userCredential.user);
    } catch (error: any) {
      console.error('Google Sign In Failed:', error);
       if (error.code === 'auth/unauthorized-domain') {
        toast({
          variant: "destructive",
          title: "Dominio Non Autorizzato",
          description: "L'accesso da questo sito non è abilitato. Contatta l'amministratore.",
        });
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast({
            variant: "default",
            title: "Accesso Annullato",
            description: "La finestra di accesso di Google è stata chiusa.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Accesso Google Fallito",
          description: "Impossibile accedere con Google. Riprova.",
        });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  }
  
  if (userLoading || (!userLoading && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthLayout title="Accedi" description="Accedi al tuo account OrientaDay">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="email" placeholder="Email" {...field} className="pl-10" />
                    </div>
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
                <FormControl>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="password" placeholder="Password" {...field} className="pl-10" />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Link href="/forgot-password" passHref>
              <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">Password dimenticata?</span>
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Oppure continua con</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
        {isGoogleLoading ? <span className="animate-pulse">Verifica...</span> : <><GoogleIcon className="mr-2 h-5 w-5" /> Accedi con Google</>}
      </Button>
    </AuthLayout>
  );
}
