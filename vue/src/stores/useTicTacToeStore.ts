import { defineStore } from 'pinia'
import { useDocument } from 'vuefire'
import { collection, doc, getFirestore } from 'firebase/firestore'
import type { TicTacToe } from 'shared/models/games/tictactoe'
import { useTicTacToeApi } from '@/composables/useTicTacToeApi'
import type { TicTacToe_MakeMoveRequest } from 'shared/requests/tictactoe'

export const useTicTacToeStore = defineStore('tictactoe', () => {
  const db = getFirestore()

  const ticTacToeApi = useTicTacToeApi()

  const gameData = (gameId: string) =>
    useDocument<TicTacToe>(doc(collection(db, 'gameData'), gameId))

  const makeMove = async (request: TicTacToe_MakeMoveRequest) => {
    return await ticTacToeApi.makeMove(request)
  }

  return { gameData, makeMove }
})
