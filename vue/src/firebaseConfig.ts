// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDA9HL3zDVU5WySNUnyWYqa-e9PiOZNzg',
  authDomain: 'family-game-night-b8702.firebaseapp.com',
  projectId: 'family-game-night-b8702',
  storageBucket: 'family-game-night-b8702.appspot.com',
  messagingSenderId: '584214321656',
  appId: '1:584214321656:web:0334e2a12ce5fa6f27de0d'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase services
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const functions = getFunctions(firebaseApp) // Initialize Functions

// Connect to Firebase Emulators if running in a development environment
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  // Firestore Emulator
  connectFirestoreEmulator(db, 'localhost', 8080)
  // Auth Emulator
  connectAuthEmulator(auth, 'http://localhost:9099')
  // Functions Emulator
  connectFunctionsEmulator(functions, 'localhost', 5001)
}

// Export for use elsewhere in your app
export { db, auth, functions }
