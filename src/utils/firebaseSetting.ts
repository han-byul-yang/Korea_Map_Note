import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBEUrl37bZdhLFvpWqvbWGFtyFzbdGHmMc',
  authDomain: 'world-map-note.firebaseapp.com',
  projectId: 'world-map-note',
  storageBucket: 'world-map-note.appspot.com',
  messagingSenderId: '342606509345',
  appId: '1:342606509345:web:fdc80483b6a68d94c43a60',
  measurementId: 'G-M77GG6K1ZD',
}

const firebaseApp = initializeApp(firebaseConfig)

export const firebaseAuthService = getAuth(firebaseApp)

export const firebaseDB = getFirestore(firebaseApp)
