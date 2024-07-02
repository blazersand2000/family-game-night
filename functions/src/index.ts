// This is the entry point for the Firebase Functions
import * as functions from "firebase-functions"
import { handlers } from "./mediation"
import { debug } from "firebase-functions/logger"
//import { CreateGameRequest } from "shared/requests"

export const gameAction = functions.https.onCall(async (data, context) => {
   //  // Ensure the user is authenticated
   //  if (!context.auth) {
   //     throw new functions.https.HttpsError(
   //        "unauthenticated",
   //        "The function must be called while authenticated."
   //     )
   //  }
   debug("Request data:", data)
   console.log("Request data:", data)
   const handler = handlers.find((h) => h.canHandle(data))
   if (!handler) {
      console.log("No handler found for request type")
      throw new functions.https.HttpsError("invalid-argument", "No handler found for request type")
   }
   console.log("Handler found for request type")
   return handler.handle(data)
})

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
