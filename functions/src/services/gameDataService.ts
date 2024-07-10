import { getFirestore, FieldValue, WithFieldValue, DocumentData } from "firebase-admin/firestore"
import { CreateGameRequest } from "shared/requests/game"
import { ReceivedRequest } from "@/mediation"

const db = getFirestore()

export async function createGame<T extends WithFieldValue<DocumentData>>(
   request: ReceivedRequest<CreateGameRequest>,
   gameData: T
): Promise<string> {
   const batch = db.batch()

   const gameRef = db.collection("games").doc()
   const gameDataRef = db.collection("gameData").doc(gameRef.id)

   const game = {
      ...request,
      createdAt: FieldValue.serverTimestamp(),
      gameManagerId: request.context.auth!.uid,
      playerIds: [request.context.auth!.uid],
   }

   batch.set(gameRef, game)
   batch.set(gameDataRef, gameData)

   await batch.commit()

   return gameRef.id
}

export async function updateGameData<T extends WithFieldValue<DocumentData>, TResponse>(
   gameId: string,
   updateCallback: (current: T | null, update: (newData: T) => void) => TResponse
): Promise<TResponse> {
   const gameDataRef = db.collection("gameData").doc(gameId)
   return await db.runTransaction(async (transaction) => {
      const gameDataDoc = await transaction.get(gameDataRef)
      const currentData = gameDataDoc.exists ? (gameDataDoc.data() as T) : null

      let updatedData: T | undefined

      // Provide a function to the callback that allows updating the data
      const update = (newData: T) => {
         updatedData = newData
      }

      // Execute the callback, passing the current data and the update function
      var result = await updateCallback(currentData, update)

      // If updatedData is undefined, it means the update function was not called, and the update should be aborted
      if (updatedData === undefined) {
         //throw new Error("Update aborted by callback");
         return result
      }

      // Proceed with the update using the modified data
      await transaction.update(gameDataRef, updatedData)

      return result
   })
}
