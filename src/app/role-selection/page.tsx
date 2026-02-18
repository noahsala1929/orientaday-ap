'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeprecatedRoleSelectionPage() {
  const router = useRouter();

  useEffect(() => {
    // This page is deprecated. The role selection is now on the homepage.
    router.replace('/');
  }, [router]);

  // Show a loading or nothing while the redirect is in progress
  return null;
}
