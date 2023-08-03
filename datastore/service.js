const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

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

exports.decrementAvailableKudos = async (userId) => {
  try {
    await db.collection('users')
      .doc(userId)
      .update({
        nkudos_to_give: admin.firestore.FieldValue.increment(-1)
      })
  } catch (e) {
    if (e.message.includes('NOT_FOUND')) {
      await exports.addOrUpdateUser(userId, {
        id: userId,
        nkudos_balance: 0,
        nkudos_to_give: 4,
        nkudos_received: []
      })
    } else {
      console.error('Error updating user: ', e);
    }
  }
}

exports.addKudo = async (userId, kudo) => {
  try {
    await db.collection('users')
      .doc(userId)
      .update({
        nkudos_received: admin.firestore.FieldValue.arrayUnion(kudo),
        nkudos_balance: admin.firestore.FieldValue.increment(1)
      })
  } catch (e) {
    if (e.message.includes('NOT_FOUND')) {
      await exports.addOrUpdateUser(userId, {
        id: userId,
        nkudos_balance: 1,
        nkudos_to_give: 5,
        nkudos_received: [
          kudo
        ]
      })
    } else {
      console.error('Error updating user: ', e);
    }
  }
}

exports.addOrUpdateUser = async (userId, newData, merge = false) => {
  try {
    await db.collection('users')
      .doc(userId)
      .set(newData, { merge })
  } catch (e) {

  }
}
