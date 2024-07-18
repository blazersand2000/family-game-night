import { getFirestore } from "firebase-admin/firestore"
import { ReceivedRequest } from "@/mediation"
import { UpdateProfileRequest } from "shared/requests/user"
import { User } from "shared/models/user"

const db = getFirestore()

export async function updateProfile(request: ReceivedRequest<UpdateProfileRequest>) {
   const userRef = db.collection("users").doc(request.context.auth!.uid)

   await userRef.set({
      displayName: request.payload.displayName,
   })

   return
}

export async function getUserData(userId: string): Promise<User | null> {
   const userRef = db.collection("users").doc(userId)

   const user = await userRef.get()

   return user.exists ? (user.data() as User) : null
}
