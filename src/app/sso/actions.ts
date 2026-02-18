'use server';

import { adminAuth } from '@/firebase/admin';

export async function createCustomToken(idToken: string): Promise<{ customToken: string, displayName: string | undefined, email: string | undefined }> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const customToken = await adminAuth.createCustomToken(uid);
    return { 
        customToken,
        displayName: decodedToken.name,
        email: decodedToken.email
    };
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw new Error('Failed to create custom token.');
  }
}
