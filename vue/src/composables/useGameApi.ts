import callFunction from '@/FunctionCaller'
import type { CreateGameRequest, JoinGameRequest } from 'shared/requests/game'

export function useGameApi() {
  // Initialize Firebase Functions

  async function createGame(request: CreateGameRequest) {
    const response = await callFunction('CreateGame', request)
    return response
  }

  async function joinGame(request: JoinGameRequest) {
    const response = await callFunction('JoinGame', request)
    return response
  }

  return {
    createGame,
    joinGame
  }
}
