// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

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
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const db = getFirestore(app)
const auth = getAuth(app)

// Connect to Firebase Emulators if running in a development environment
if (location.hostname === 'localhost') {
  // Firestore Emulator
  connectFirestoreEmulator(db, 'localhost', 8080)
  // Auth Emulator
  connectAuthEmulator(auth, 'http://localhost:9099')
}

// Export for use elsewhere in your app
export { db, auth }
