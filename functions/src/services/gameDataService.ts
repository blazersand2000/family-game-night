import { getFirestore, FieldValue } from "firebase-admin/firestore"
import { CreateGameRequest } from "shared/requests"

const db = getFirestore()

export async function createGame(gameData: CreateGameRequest) {
   const gamesCollection = db.collection("games")
   const docRef = await gamesCollection.add({
      ...gameData,
      createdAt: FieldValue.serverTimestamp(),
   })
   return docRef.id
}
