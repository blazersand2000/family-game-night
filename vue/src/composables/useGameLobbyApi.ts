import callFunction from '@/FunctionCaller'
import type { CreateGameLobbyRequest, JoinGameLobbyRequest } from 'shared/requests/gameLobby'

export function useGameLobbyApi() {
  async function createGameLobby(request: CreateGameLobbyRequest) {
    const response = await callFunction('CreateGameLobby', request)
    return response
  }

  async function joinGameLobby(request: JoinGameLobbyRequest) {
    const response = await callFunction('JoinGameLobby', request)
    return response
  }

  return {
    createGameLobby,
    joinGameLobby
  }
}
