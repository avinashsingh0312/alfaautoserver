const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n'); // This line fixes the formatting

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
