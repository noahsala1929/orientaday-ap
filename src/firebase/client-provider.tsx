'use client';

import {useEffect, useState} from 'react';
import {FirebaseApp} from 'firebase/app';
import {Auth} from 'firebase/auth';
import {Firestore} from 'firebase/firestore';

import {FirebaseProvider} from '@/firebase/provider';
import {initializeFirebase} from '@/firebase';

// NOTE: This is a client-only provider that is used to wrap the
// FirebaseProvider. This is necessary because the FirebaseProvider
// is a server component, but we need to initialize Firebase on the
// client.
export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  useEffect(() => {
    // We only want to initialize Firebase on the client.
    const localFirebase = initializeFirebase();
    setFirebase(localFirebase);
  }, []);

  if (!firebase) {
    // TODO: Add a loading spinner.
    return null;
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
