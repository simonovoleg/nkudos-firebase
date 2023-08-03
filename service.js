const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

exports.getUsers = async () => {
  try {
    const collectionRef = db.collection('users');

    // Perform the query (e.g., get all documents in the collection)
    const snapshot = await collectionRef.get();

    // Extract data from the documents
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error querying Firestore:', error);
  }
}

exports.getUser = async (userId) => {
  try {
    const collectionRef = db
      .collection('users')
      .where('id', '==', userId);
    const snapshot = await collectionRef.get();

    if (!snapshot.empty) return snapshot.docs[0].data()
  } catch (e) {
    console.error('Error querying Firestore:', e);
  }
}
