/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Define an HTTP function to fetch data from Firestore
exports.fetchData = functions.https.onRequest(async (request, response) => {
  try {
    // Get a reference to the Firestore collection you want to fetch data from
    const collectionRef = admin.firestore().collection("users");

    // Get the documents from the collection
    const snapshot = await collectionRef.get();
    const data = snapshot.docs.map((doc) => doc.data());

    response.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).json({error: "Error fetching data"});
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
