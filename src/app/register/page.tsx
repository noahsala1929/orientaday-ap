'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // La registrazione avviene sul sito principale, reindirizza al login.
    router.replace('/login');
  }, [router]);

  // Mostra un caricamento o nulla mentre il reindirizzamento è in corso
  return null;
}
