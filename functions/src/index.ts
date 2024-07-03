// This is the entry point for the Firebase Functions
import * as functions from "firebase-functions"
import { routeRequest } from "./mediation"
import { GenericRequest, AllRequests } from "shared/shared"

export const gameAction = functions.https.onCall(
   async (data: GenericRequest<AllRequests>, context: functions.https.CallableContext) => {
      return routeRequest(data)
   }
)
