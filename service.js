const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getUsers() {
  try {
    const collectionRef = db.collection('users');

    // Perform the query (e.g., get all documents in the collection)
    const snapshot = await collectionRef.get();

    // Extract data from the documents
    const data = snapshot.docs.map((doc) => doc.data());

    console.log(data); // Do something with the data
    // return data;
  } catch (error) {
    console.error('Error querying Firestore:', error);
  }
}

module.exports = getUsers;
