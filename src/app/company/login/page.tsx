'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AuthLayout } from '@/components/auth-layout';
import { useToast } from '@/hooks/use-toast';
import { companies } from '@/lib/data';

const formSchema = z.object({
  companyId: z.string().min(1, "È obbligatorio selezionare un'azienda."),
});

export default function CompanyLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { companyId: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const company = companies.find(c => c.id === values.companyId);

    if (company) {
      sessionStorage.setItem('companyId', company.id);
      toast({
        title: 'Accesso Riuscito',
        description: `Benvenuto/a nell'area di ${company.name}.`,
      });
      router.push('/company/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Selezione Fallita",
        description: "Azienda non valida. Riprova.",
      });
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout title="Accesso Area Aziendale" description="Seleziona la tua azienda per continuare.">
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
