import { defineStore } from 'pinia'
import { useCollection, useDocument } from 'vuefire'
import { collection, doc, getFirestore } from 'firebase/firestore'
import type { Game } from 'shared/models/game'

export const useGameStore = defineStore('game', () => {
  const db = getFirestore()
  const games = useCollection<Game>(collection(db, 'games'))
  const game = (gameId: string) => useDocument<Game>(doc(collection(db, 'games'), gameId))

  return { games, game }
})
