require("module-alias/register")
// This is the entry point for the Firebase Functions
import * as admin from "firebase-admin" // Import the 'admin' module
admin.initializeApp()

import * as functions from "firebase-functions"
import { routeRequest } from "./mediation"
import { GenericRequest, AllRequests } from "shared/shared"
import { Settings } from "firebase-admin/firestore"

const db = admin.firestore()

var settings: Settings = {
   ignoreUndefinedProperties: true,
}
// Check if running in the Firebase emulator environment
if (process.env.FUNCTIONS_EMULATOR === "true") {
   settings = {
      ...settings,
      host: "localhost:8080",
      ssl: false,
   }
}

db.settings(settings)

export const gameAction = functions.https.onCall(
   async (data: GenericRequest<AllRequests>, context: functions.https.CallableContext) => {
      AssertAuthorized(context)
      return routeRequest({ ...data, context })
   }
)

function AssertAuthorized(context: functions.https.CallableContext) {
   if (!context.auth) {
      throw new functions.https.HttpsError(
         "unauthenticated",
         "You must be authenticated to call this endpoint."
      )
   }
   // TODO: We should also ensure user is found in firestore and has a name set if we can ensure it's highly performant since it would be done on every request
}
