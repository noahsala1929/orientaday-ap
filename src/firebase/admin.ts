import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),
  });
}

export const adminAuth = admin.auth();
