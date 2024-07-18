import { defineStore } from 'pinia'
import { useCollection, useCurrentUser, useDocument } from 'vuefire'
import { collection, doc, getFirestore, query, where } from 'firebase/firestore'
import type { GameLobby } from 'shared/models/gameLobby'
import { useGameLobbyApi } from '@/composables/useGameLobbyApi'

export const useGameLobbyStore = defineStore('gameLobby', () => {
  const myGameLobbies = useCollection<GameLobby>(
    query(
      collection(getFirestore(), 'gameLobbies'),
      where('playerIds', 'array-contains', useCurrentUser().value?.uid)
    )
  )

  const gameLobby = (gameLobbyId: string) =>
    useDocument<GameLobby>(doc(collection(getFirestore(), 'gameLobbies'), gameLobbyId))

  const createGameLobby = async () => {
    return await useGameLobbyApi().createGameLobby({})
  }

  const joinGameLobby = async (gameLobbyId: string) => {
    return await useGameLobbyApi().joinGameLobby({ gameLobbyId })
  }

  return { myGameLobbies, gameLobby, createGameLobby, joinGameLobby }
})
