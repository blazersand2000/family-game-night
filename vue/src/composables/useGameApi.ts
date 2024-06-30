import { getFunctions, httpsCallable } from 'firebase/functions'

export function useGameApi() {
  // Initialize Firebase Functions
  const functions = getFunctions()

  // Function to call the addMessage Firebase Function
  const createGame = async (gameData: { text: string }) => {
    try {
      // Create a reference to the callable function
      const addMessageFn = httpsCallable(functions, 'addMessage')

      // Call the function with gameData as the argument
      const result = await addMessageFn(gameData)

      // Process and return the result
      return result.data as { result: string } // Adjust according to the expected result structure
    } catch (error) {
      console.error('Error calling addMessage function:', error)
      throw error // Rethrow or handle as needed
    }
  }

  return { createGame }
}
