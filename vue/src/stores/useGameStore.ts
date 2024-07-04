import { defineStore } from 'pinia'
import { useCollection } from 'vuefire'
import { collection, getFirestore } from 'firebase/firestore'
import type { Game } from 'shared/models/game'

export const useGameStore = defineStore('game', () => {
  const db = getFirestore()
  const games = useCollection<Game>(collection(db, 'games'))

  return { games }
})
