// This is the entry point for the Firebase Functions
import * as functions from "firebase-functions"

// Define a callable function
export const addMessage = functions.https.onCall((data, context) => {
   // // Ensure the user is authenticated
   // if (!context.auth) {
   //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
   // }

   // Example operation: add a message
   const text = data.text
   // Perform operations, e.g., write to Firestore or perform some logic
   return { result: `Message received: ${text}` }
})
