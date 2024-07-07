require("module-alias/register")
// This is the entry point for the Firebase Functions
import * as admin from "firebase-admin" // Import the 'admin' module
admin.initializeApp()

import * as functions from "firebase-functions"
import { routeRequest } from "./mediation"
import { GenericRequest, AllRequests } from "shared/shared"

const db = admin.firestore()
// Check if running in the Firebase emulator environment
if (process.env.FUNCTIONS_EMULATOR === "true") {
   db.settings({
      host: "localhost:8080",
      ssl: false,
   })
}

export const gameAction = functions.https.onCall(
   async (data: GenericRequest<AllRequests>, context: functions.https.CallableContext) => {
      return routeRequest(data)
   }
)
