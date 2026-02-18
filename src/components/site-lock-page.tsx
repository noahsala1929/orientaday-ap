'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { useSiteLock } from './site-lock-provider';

const ADMIN_PIN = '72943816';

const formSchema = z.object({
  pin: z.string().length(8, "Il PIN deve essere di 8 cifre."),
});

export function SiteLockPage() {
  const { unlockSite } = useSiteLock();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { pin: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (values.pin === ADMIN_PIN) {
      toast({
        title: 'Accesso Confermato',
        description: 'Benvenuto! Verrai reindirizzato alla pagina principale.',
      });
      unlockSite();
      router.push('/');
    } else {
      toast({
        variant: "destructive",
        title: "PIN Errato",
        description: "Il PIN inserito non è corretto. Riprova.",
      });
      form.reset();
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Lavori in Corso" description="Il sito è in fase di sviluppo. Accesso consentito solo tramite PIN.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                            className="pl-10 text-center tracking-[1em]"
                            maxLength={8}
                            autoComplete="off"
                        />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifica...' : (
                <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sblocca
                </>
            )}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
