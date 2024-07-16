import { getFirestore, FieldValue, WithFieldValue, DocumentData } from "firebase-admin/firestore"
import { CreateGameRequest } from "shared/requests/game"
import { ReceivedRequest } from "@/mediation"
import { generateSecureUniqueId } from "./idGenerationService"
import { CreateGameLobbyRequest, JoinGameLobbyResponse } from "shared/requests/gameLobby"
import { GameLobby } from "shared/models/gameLobby"
import { GenericResponse } from "shared/shared"

const db = getFirestore()

export async function createGameLobby(
   request: ReceivedRequest<CreateGameLobbyRequest>
): Promise<string> {
   const id = generateSecureUniqueId()

   const gameLobbyRef = db.collection("gameLobbies").doc(id)

   await gameLobbyRef.set({
      createdAt: FieldValue.serverTimestamp(),
      creatorId: request.context.auth!.uid,
      playerIds: [request.context.auth!.uid],
      currentGameId: null,
   })

   return id
}

export async function joinGameLobby(
   gameLobbyId: string,
   updateCallback: UpdateCallback<GameLobby, GenericResponse<JoinGameLobbyResponse>>
): Promise<GenericResponse<JoinGameLobbyResponse>> {
   return updateDocument<GameLobby, GenericResponse<JoinGameLobbyResponse>>(
      "gameLobbies",
      gameLobbyId,
      updateCallback
   )
}

export async function createGame<T extends WithFieldValue<DocumentData>>(
   request: ReceivedRequest<CreateGameRequest>,
   gameData: T
): Promise<string> {
   const batch = db.batch()

   const gameRef = db.collection("games").doc()
   const gameDataRef = db.collection("gameData").doc(gameRef.id)

   const game = {
      ...request.payload,
      createdAt: FieldValue.serverTimestamp(),
      gameManagerId: request.context.auth!.uid,
   }

   batch.set(gameRef, game)
   batch.set(gameDataRef, gameData)

   await batch.commit()

   return gameRef.id
}

export async function updateGameData<T extends WithFieldValue<DocumentData>, TResponse>(
   gameId: string,
   updateCallback: UpdateCallback<T, TResponse>
): Promise<TResponse> {
   return updateDocument<T, TResponse>("gameData", gameId, updateCallback)
}

async function updateDocument<T extends WithFieldValue<DocumentData>, TResponse>(
   collection: string,
   id: string,
   updateCallback: (current: T | null, update: (newData: T) => void) => TResponse
) {
   const documentRef = db.collection(collection).doc(id)
   return await db.runTransaction(async (transaction) => {
      const document = await transaction.get(documentRef)
      const currentData = document.exists ? (document.data() as T) : null

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
      await transaction.update(documentRef, updatedData)

      return result
   })
}

type UpdateCallback<T extends WithFieldValue<DocumentData>, TResponse> = (
   current: T | null,
   update: (newData: T) => void
) => TResponse
