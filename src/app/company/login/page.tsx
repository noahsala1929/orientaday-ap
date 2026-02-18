'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, KeyRound, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { companies } from '@/lib/data';

const formSchema = z.object({
  companyId: z.string().min(1, "È obbligatorio selezionare un'azienda."),
  pin: z.string().length(4, "Il PIN deve essere di 4 cifre."),
});

const COMPANY_PIN = "1929";

export default function CompanyLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { companyId: '', pin: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const company = companies.find(c => c.id === values.companyId);

    if (company && values.pin === COMPANY_PIN) {
      sessionStorage.setItem('companyId', company.id);
      toast({
        title: 'Accesso Riuscito',
        description: `Benvenuto/a nell'area di ${company.name}.`,
      });
      router.push('/company/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Accesso Fallito",
        description: "Azienda o PIN non corretti. Riprova.",
      });
      form.setValue('pin', '');
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Accesso Area Aziendale" description="Seleziona la tua azienda e inserisci il PIN per continuare.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Azienda</FormLabel>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Seleziona la tua azienda" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map(company => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Aziendale</FormLabel>
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
