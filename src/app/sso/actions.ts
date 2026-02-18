'use server';

import { adminAuth } from '@/firebase/admin';

export async function createCustomToken(idToken: string): Promise<string> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const customToken = await adminAuth.createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw new Error('Failed to create custom token.');
  }
}
