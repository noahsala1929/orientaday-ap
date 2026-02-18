import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
  }
  
  const serviceAccount = JSON.parse(serviceAccountString);

  // Replace literal \n with actual newlines
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
