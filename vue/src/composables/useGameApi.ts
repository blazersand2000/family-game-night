import { getFunctions, httpsCallable } from 'firebase/functions'
import type { CreateGameRequest } from 'shared/requests'

export function useGameApi() {
  // Initialize Firebase Functions
  const functions = getFunctions()

  // Function to call the addMessage Firebase Function
  const createGame = async (gameData: { text: string }) => {
    try {
      // Create a reference to the callable function
      const addMessageFn = httpsCallable<CreateGameRequest>(functions, 'gameAction')

      // Call the function with gameData as the argument
      const result = await addMessageFn({ type: 'createGame', gameData })

      // Process and return the result
      return result.data // Adjust according to the expected result structure
    } catch (error) {
      console.error(error)
      throw error // Rethrow or handle as needed
    }
  }

  return { createGame }
}
